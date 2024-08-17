const User = require("../models/userModel");
const Teacher = require("../models/teacherModel");
const Course = require("../models/courseModel");
const Job = require("../models/jobOpeningModel");
const Coupon = require("../models/couponModel");
const Student = require("../models/studentModel");
const Order = require("../models/orderModel");
const Contact = require("../models/contactModel");
const JobApplication = require("../models/jobApplicationModel");
const Affiliate = require("../models/affiliateModel");
const fs = require("fs");
const path = require("path");

//fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    //check if user is authorized to deactivate course
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

// fetch all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    //check if user is authorized to deactivate course
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }
    const teachers = await Teacher.find().populate("user");
    res.status(200).json({ success: true, teachers: teachers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    //check if the user to be deleted exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist!" });
    }

    //check if user is authorised to remove users
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    //check if user to be deleted is also admin
    //if he/she is admin then unauthorized to delete another admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete another admin!",
      });
    }

    const deletedUser = await User.findOneAndDelete({ _id: userId });

    //if deletedUser was a teacher, delete from teacher document too
    if (deletedUser.role === "teacher") {
      await Teacher.findOneAndDelete({ user: userId });
    }

    //if deletedUser was a student, delete from student document too
    if (deletedUser.role === "student") {
      await Student.findOneAndDelete({ user: userId });
    }

    return res.status(200).json({ success: true, deleteUser: deletedUser });
  } catch (error) {
    console.error(error);
    res.json(500).json({ success: false, error: error });
  }
};

//delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    //check if course exists
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course doesn't exists!!" });
    }

    //check if user is authorized to delete course
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    //delete course
    const deletedCourse = await Course.findOneAndDelete({ _id: courseId });

    //remove course from teachers course section
    await Teacher.findOneAndUpdate(
      {
        user: deletedCourse.instructor,
      },
      {
        $pull: {
          courses: courseId,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse: deletedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

//activate a user
exports.activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    //check if the user to be suspended exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist!" });
    }

    //check if user is authorised to remove users
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    //check if user to be deleted is also admin
    //if he/she is admin then unauthorized to suspend another admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to suspend another admin!",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { status: "active" },
      { new: true }
    );
    res.status(203).json({
      success: true,
      message: "User has been suspended",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

//suspend a user
exports.suspendUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    //check if the user to be suspended exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist!" });
    }

    //check if user is authorised to remove users
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    //check if user to be deleted is also admin
    //if he/she is admin then unauthorized to suspend another admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to suspend another admin!",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { status: "suspended" },
      { new: true }
    );
    res.status(203).json({
      success: true,
      message: "User has been suspended",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

//activate a course
exports.activateCourse = async (req, res) => {
  try {
    let courseId = req.params.courseId;

    //check if course exists
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course doesn't exists!!" });
    }

    //check if user is authorized to deactivate course
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    //deactivate course
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { status: "active" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Course has been active!",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

//deactivate a course
exports.deactivateCourse = async (req, res) => {
  try {
    let courseId = req.params.courseId;

    //check if course exists
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course doesn't exists!!" });
    }

    //check if user is authorized to deactivate course
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    //deactivate course
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { status: "deactivated" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Course has been deactivated !",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

//add new job opening
exports.addNewJobOpening = async (req, res) => {
  try {
    //check if user is authorised to add job opening
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }

    const newJob = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "New job opening has been created",
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.updateJobOpening = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to perform this action!",
      });
    }
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.jobId },
      req.body,
      { new: true }
    );
    if (updatedJob) res.status(201).json({ success: true, job: updatedJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.deleteJobOpening = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to perform this action!",
      });
    }
    await Job.findOneAndDelete({ _id: req.params.jobId });
    res
      .status(200)
      .json({ success: true, message: "Job opening deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json({
      success: true,
      message: "New coupon has been created!",
      coupon: newCoupon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.activateCoupon = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }
    let coupon = await Coupon.findOneAndUpdate(
      { _id: req.params.couponId },
      { status: "active" },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Coupon activated!" });
  } catch (error) {
    console.log(error);
    res.status(505).json({ success: false, error: error });
  }
};

exports.deactivateCoupon = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }
    let coupon = await Coupon.findOneAndUpdate(
      { _id: req.params.couponId },
      { status: "deactivated" },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Coupon deactivated!" });
  } catch (error) {
    console.log(error);
    res.status(505).json({ success: false, error: error });
  }
};
exports.deleteCoupon = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }
    let coupon = await Coupon.findOneAndDelete({ _id: req.params.couponId });
    res.status(200).json({ success: true, message: "Coupon deleted!" });
  } catch (error) {
    console.log(error);
    res.status(505).json({ success: false, error: error });
  }
};

//get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, jobs: jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get specific job
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId });
    res.status(200).json({ success: true, job: job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//handle job applications
exports.jobApply = async (req, res) => {
  try {
    const jobApplication = await JobApplication.create({
      ...req.body,
      resume: req.file.path,
    });
    res
      .status(201)
      .json({ success: true, message: "Application successfully submitted !" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
    console.log(error);
  }
};

//get all job applicants
exports.getJobApplicants = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized !" });
    }
    const jobAppplicants = await JobApplication.find({
      job: req.params.jobId,
    }).populate("job");
    res.status(200).json({ success: true, jobApplicants: jobAppplicants });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get applicant pdf
exports.getResume = async (req, res) => {
  try {
    const applicant = await JobApplication.findOne({
      _id: req.params.applicantId,
    });

    const stat = fs.statSync(applicant.resume);

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": stat.size,
    });

    const readStream = fs.createReadStream(applicant.resume);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get all courses
exports.getAllCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        sucess: false,
        message: "Unauthorized to perform this action!",
      });
    }
    const courses = await Course.find().populate({
      path: "instructor",
      model: "user",
      populate: {
        path: "teacher", // Assuming 'teacher' is the field in the 'user' model that you want to populate
        model: "teacher", // Replace 'teacher' with the actual model name
      },
    });
    res.status(200).json({ success: true, courses: courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get all orders
exports.getAllOrder = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized !" });
    }
    const orders = await Order.find()
      .populate("user")
      .populate("orders")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

// get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, contact: contacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//create a new affiliate
exports.createNewAffiliate = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized!" });
    }
    const affiliate = await Affiliate.create(req.body);
    res.status(201).json({
      success: true,
      affiliate: affiliate,
      message: "Affiliate has been created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//edit an affiliate
exports.editAffiliate = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized!" });
    }
    const updatedAffiliate = await Affiliate.findOneAndUpdate(
      { _id: req.params.affiliateId },
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Affiliate details updated !",
      affiliated: updatedAffiliate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get all affiliates
exports.getAffiliates = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send("You are not authorised to view this");
    }
    const affiliates = await Affiliate.find();
    res.status(200).json({ success: true, affiliates: affiliates });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
