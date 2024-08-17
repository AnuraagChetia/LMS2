const User = require("../models/userModel");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const Coupon = require("../models/couponModel");
const Contact = require("../models/contactModel");
const Resetpasswordlinks = require("../models/resetPasswordLinksModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailjs = require("@emailjs/nodejs");

function tokenGenerator(id, email) {
  return jwt.sign({ id: id, email: email }, process.env.AUTH_KEY, {
    expiresIn: "30d",
  });
}

//mail send fuunction using email js
const sendMail = async (email) => {
  try {
    //get user details
    const user = await User.findOne({ email: email });

    //create a reset request
    const resetLink = await Resetpasswordlinks.create({
      isActive: true,
      user: user._id,
    });

    const templateParams = {
      to_email: email,
      reply_to: user.userName,
      to_name: user.firstName,
      reset_link: `${process.env.reset_URL}/${resetLink._id}`,
    };

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID, // emailjs service id
      process.env.EMAILJS_TEMPLATE_ID, // emailjs template id
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY, // emailjs public key
        privateKey: process.env.EMAILJS_PRIVATE_KEY, //emailjs private key, optional, highly recommended for security reasons
      }
    );
    return response;
  } catch (error) {
    if (error instanceof emailjs.EmailJSResponseStatus) {
      // console.log("EMAILJS FAILED...", error);
      return error;
    }

    // console.log("ERROR", error);
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      avatar,
      bio,
      phone,
      address,
      role,
    } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !role
    ) {
      res.status(400);
      throw new Error("Please Enter all the fields");
    }
    //check if user already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //register a new user
    const user = await User.create({
      userName: username,
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      role: role,
      avatar: avatar || "",
      bio: bio || "",
      address: address || "", // could modify into an object with city town etc
    });

    if (user) {
      if (role === "student") {
        const student = await Student.create({ user: user._id });
        user.student = student._id;
        await user.save();
      }
      if (role === "teacher") {
        const teacher = await Teacher.create({ user: user._id });
        user.teacher = teacher._id;
        await user.save();
      }
      res
        .status(201)
        .json({ success: true, message: "User registration successful" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Failed to register the user" });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Check if the error is due to a duplicate email (MongoDB error code 11000)
      console.error("Error: User with this email already exists.");
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    //login logic
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    let userRole = user.role;
    if (userRole !== "admin") await user.populate(userRole);
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === false) {
        return res
          .status(401)
          .json({ success: false, message: "Password do not match" });
      }
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
      if (user.status === "suspended") {
        return res.status(403).json({
          success: false,
          message:
            "Your account has been suspended. Please contact lms@gmail.com",
        });
      }
      const token = tokenGenerator(user.id, email);
      return res.status(200).json({
        success: true,
        message: "Login Successful",
        id: user.id,
        token: token,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
        address: user.address,
        socialMedia: user.socialMedia,
        student: user.student,
        teacher: user.teacher,
      });
    });
  } catch (error) {
    res.status(500).json({ success: "fail", message: error });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email address doesn't belong to any user !",
      });
    }
    const response = await sendMail(req.body.email); //sends a reset password link to the email
    res.status(200).json({
      success: true,
      message: "Reset password link has been sent to your email!",
      response: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetId = req.params.resetId;
    const resetRequest = await Resetpasswordlinks.findOne({ _id: resetId });

    //check if reset link is active
    //if not active then show error page
    if (!resetRequest || !resetRequest.isActive) {
      return res.status(400).redirect(process.env.ERROR_PAGE_LINK);
    }

    //else redirect to the change-password page
    return res.redirect(`${process.env.CHANGE_PASSWORD_LINK}/${resetId}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.changePassword = async (req, res) => {
  //change password using forget password
  try {
    const resetId = req.params.resetId;
    const resetRequest = await Resetpasswordlinks.findOne({ _id: resetId });

    //check if reset link is active
    //if not active then show error page
    if (!resetRequest || !resetRequest.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "Reset link is invalid" });
    }

    const newPassword = req.body.password;
    bcrypt.hash(newPassword, 10, async (err, hash) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: resetRequest.user },
        { password: hash },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to change password" });
      }
      //deactivate the reset request
      resetRequest.isActive = false;
      await resetRequest.save();

      res.status(200).json({
        success: true,
        message: "Password changed!",
        updatedUser: updatedUser,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.changePasswordSettings = async (req, res) => {
  //change password from account settings
  try {
    const { newPassword, currentPassword } = req.body;
    //check if password matches
    bcrypt.compare(currentPassword, req.user.password, async (err, result) => {
      if (result === false) {
        return res
          .status(401)
          .json({ success: false, message: "Password do not match" });
      }
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }

      //change new password
      bcrypt.hash(newPassword, 10, async (err, hash) => {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id },
          { password: hash },
          { new: true }
        );
        if (!updatedUser) {
          return res
            .status(400)
            .json({ success: false, message: "Failed to change password" });
        }
        res.status(200).json({
          success: true,
          message: "Password changed!",
          updatedUser: updatedUser,
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.changeEmail = async (req, res) => {
  //change user email from account settings
  try {
    const { newEmail, password } = req.body;
    //check password
    bcrypt.compare(password, req.user.password, async (err, result) => {
      if (result === false) {
        return res
          .status(401)
          .json({ success: false, message: "Password do not match" });
      }
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ success: false, message: "Something went wrong" });
      }
      //check new email
      if (!newEmail) {
        return res
          .status(500)
          .json({ success: false, message: "New email not provided!" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { email: newEmail },
        { new: true }
      );

      if (!user) {
        return res
          .status(500)
          .json({ success: false, message: "Something went wrong!" });
      }
      res
        .status(200)
        .json({ success: true, message: "Email updated successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      headline,
      website,
      twitter,
      facebook,
      linkedin,
      youtube,
    } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        firstName: firstName,
        lastName: lastName,
        headline: headline,
        website: website,
        twitter: twitter,
        facebook: facebook,
        linkedin: linkedin,
        youtube: youtube,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Profile updated successfully!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Remove the user from the database
    const user = await User.deleteOne({ _id: req.user._id });
    res.status(200).json({ success: true, message: "Account deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ success: false, coupons: coupons });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//update the profile picture
exports.updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar: `${req.file.path}` },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, message: "Avatar updated", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

// api for contact me form
exports.contactMeApi = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Your message has been posted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
