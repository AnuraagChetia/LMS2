const Razorpay = require("razorpay");
const Order = require("../models/orderModel");
const Course = require("../models/courseModel");
const Student = require("../models/studentModel");
const Coupon = require("../models/couponModel");
const Teacher = require("../models/teacherModel");
const Affiliate = require("../models/affiliateModel");

const applyDiscount = (totalAmount, discountPercentage, maxDiscountAmount) => {
  // Validate input values
  if (
    typeof totalAmount !== "number" ||
    typeof discountPercentage !== "number"
  ) {
    throw new Error(
      "Invalid input. totalAmount and discountPercentage must be numbers."
    );
  }

  // Calculate the discount amount
  const discountAmount = totalAmount * (discountPercentage / 100);

  // Determine the actual deducted amount considering the maximum discount amount
  const actualDiscountAmount =
    maxDiscountAmount === null
      ? discountAmount
      : Math.min(discountAmount, maxDiscountAmount);

  // Calculate the discounted total amount
  const discountedTotal = totalAmount - actualDiscountAmount;
  return discountedTotal;
};

exports.checkCoupon = async (req, res) => {
  try {
    //check if code is from an affiliate
    const affiliate = await Affiliate.findOne({ code: req.body.coupon });
    if (affiliate) {
      return res.status(200).json({
        success: true,
        maxDisCountAmount: null,
        discountPercentage: affiliate.discountPercentage,
        code: affiliate.code,
      });
    }
    //if code is not from affiliate
    const coupon = await Coupon.findOne({ code: req.body.coupon });
    if (!coupon) {
      return res
        .status(404)
        .json({ succes: false, message: "Coupon doesn't exist" });
    }
    if (coupon) {
      //Check if coupon is active
      if (!coupon.isActive)
        return res
          .status(401)
          .json({ success: false, message: "The coupon is inactive" });

      // Check the expiry date of the coupon
      let currentDate = new Date();
      if (currentDate > coupon.validUntill) {
        return res
          .status(401)
          .json({ success: false, message: "This coupon has expired" });
      }
      //Check if coupon validity has started
      if (currentDate < coupon.validFrom) {
        return res
          .status(401)
          .json({ success: false, message: "This coupon is not valid yet" });
      }
      if (coupon.usedCount >= coupon.maxUses) {
        //Checking whether maxUses complied
        return res
          .status(402)
          .json({ success: false, message: "Maximum uses over" });
      }
      //If everything is fine then save this coupon to session
      return res.status(200).json({
        success: true,
        maxDisCountAmount: coupon.maxDiscountAmount,
        discountPercentage: coupon.discountPercentage,
        code: coupon.code,
        description: coupon.description,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.orderCourse = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate(
      "cart"
    );

    if (!student || !student.cart.length) {
      return res.status(401).json({ msg: "Cart is empty" });
    }

    //get all cart items and place an order for all of them
    let totalAmount = 0;
    let orders = [];
    student.cart.forEach((course) => {
      totalAmount += course.price;
      orders.push(course._id);
    });
    if (req.body.coupon) {
      //check if coupon is from an affiliate
      const affiliate = await Affiliate.findOne({ code: req.body.coupon });

      if (affiliate) {
        //If everything is fine then save this coupon to session
        totalAmount = applyDiscount(
          totalAmount,
          affiliate.discountPercentage,
          null
        );
      } else {
        //if code is not from affiliate
        const coupon = await Coupon.findOne({ code: req.body.coupon });
        if (coupon) {
          //Check if coupon is active
          if (!coupon.isActive)
            return res
              .status(401)
              .json({ success: false, message: "The coupon is inactive" });

          // Check the expiry date of the coupon
          let currentDate = new Date();
          if (currentDate > coupon.validUntill) {
            return res
              .status(401)
              .json({ success: false, message: "This coupon has expired" });
          }
          //Check if coupon validity has started
          if (currentDate < coupon.validFrom) {
            return res.status(401).json({
              success: false,
              message: "This coupon is not valid yet",
            });
          }
          if (coupon.usedCount >= coupon.maxUses) {
            //Checking whether maxUses complied
            return res
              .status(402)
              .json({ success: false, message: "Maximum uses over" });
          }
          //increase uses in coupon
          await Coupon.findOneAndUpdate(
            { code: req.body.coupon },
            { $inc: { usedCount: 1 } }
          );
          //If everything is fine then save this coupon to session
          totalAmount = applyDiscount(
            totalAmount,
            coupon.discountPercentage,
            coupon.maxDiscountAmount
          );
        }
      }
    }

    const rzp = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    const order = await rzp.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
    });

    const newOrder = await Order.create(
      {
        user: req.user._id,
        orders: orders,
        amount: totalAmount,
        orderId: order.id,
        status: "PENDING",
        userId: req.user._id,
      },
      { timestamps: true }
    );

    res.status(201).json({
      orderId: order.id,
      keyId: process.env.RZP_KEY_ID,
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.successPayment = async (req, res) => {
  try {
    const paymentId = req.body.razorpay_payment_id;
    const orderId = req.body.razorpay_order_id;

    //update the status of the order
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { paymentId: paymentId, status: "SUCCESS" },
      { new: true }
    );

    //add course to the courses section of the student
    const updatedStudent = await Student.findOneAndUpdate(
      {
        user: updatedOrder.user,
      },
      {
        $push: { courses: updatedOrder.orders },
        cart: [],
        cartTotal: 0,
      },
      { new: true }
    );

    //add student to studentsEnrolled section of the course
    updatedOrder.orders.forEach(async (order) => {
      await Course.findOneAndUpdate(
        {
          _id: order,
        },
        {
          $push: { studentsEnrolled: updatedOrder.user },
        },
        {
          new: true,
        }
      );
    });

    //add to the number of courses sold by teacher
    updatedOrder.orders.forEach(async (order) => {
      const course = await Course.findOne({
        _id: order,
      });
      await Teacher.findOneAndUpdate(
        { courses: { $in: [order] } },
        { $inc: { totalSales: course.price } },
        { new: true }
      );
    });

    if (req.body.code) {
      const affiliate = await Affiliate.findOne({ code: req.body.code });
      //update affiliate details
      const aff = await Affiliate.findOneAndUpdate(
        { code: req.body.code },
        {
          $push: { referrals: req.user._id },
          $inc: { balance: affiliate.bonusPerReferral },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Transaction Successful",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.failedPayment = async (req, res) => {
  try {
    const error = req.body.error;
    const orderId = error.metadata.order_id;
    const paymentId = error.metadata.payment_id;

    //update the status of the orderf
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { paymentId: paymentId, status: "FAILED" },
      { new: true }
    );
    res
      .status(200)
      .json({ success: false, message: "Transaction Failed", error: error });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.addToCart = async (req, res) => {
  try {
    let userId = req.user._id;
    let courseId = req.params.courseId;

    //check if course exist
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });
    }

    //check if user is student
    let isStudent = await Student.findOne({ user: userId });

    if (!isStudent) {
      return res
        .status(400)
        .json({ success: false, message: "User is not a student!" });
    }

    // Check if the course already exists in the cart
    const isCourseinCart = await isStudent.cart.includes(courseId);
    if (isCourseinCart) {
      return res
        .status(400)
        .json({ success: false, message: "Course is already in the cart" });
    }

    //if student then update
    const student = await Student.findOneAndUpdate(
      { user: userId },
      {
        $push: { cart: courseId },
        cartTotal: isStudent.cartTotal + course.price,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Course added to cart", course: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let courseId = req.params.courseId;

    //check if user is student
    let isStudent = await Student.findOne({ user: req.user._id });

    if (!isStudent) {
      return res
        .status(400)
        .json({ success: false, message: "User is not a student!" });
    }

    const course = await Course.findOne({ _id: courseId });

    const student = await Student.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: { cart: courseId },
        cartTotal: isStudent.cartTotal - course.price,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Removed from cart!",
      cart: student.cart,
      student: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

//add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    // Find the student by ID
    const student = await Student.findOne({ user: req.user._id });

    const course = await Course.findOne({ _id: courseId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the course is in the cart
    const courseIndexInCart = student.cart.findIndex((id) =>
      id.equals(courseId)
    );

    if (courseIndexInCart !== -1) {
      // Remove the course from the cart
      student.cart.splice(courseIndexInCart, 1);

      // Update the cart total (assuming each course has a 'price' field)
      student.cartTotal -= course.price;
    }

    // Check if the course is already in the wishlist
    const isCourseInWishlist = student.wishlist.includes(courseId);

    if (!isCourseInWishlist) {
      // Add the course to the wishlist
      student.wishlist.push(courseId);
    }

    // Save the updated student object
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Course added to wishlist and removed from cart successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // Find the student by ID
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the course is in the wishlist
    const courseIndexInWishlist = student.wishlist.findIndex((id) =>
      id.equals(courseId)
    );

    if (courseIndexInWishlist !== -1) {
      // Remove the course from the wishlist
      student.wishlist.splice(courseIndexInWishlist, 1);
    }

    // Save the updated student object
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Course removed from wishlist",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
//remove from wishlist and add to cart
exports.removeFromWishlistAndAddToCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // Find the student by ID
    const student = await Student.findOne({ user: req.user._id });
    const course = await Course.findOne({ _id: courseId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the course is in the wishlist
    const courseIndexInWishlist = student.wishlist.findIndex((id) =>
      id.equals(courseId)
    );

    if (courseIndexInWishlist !== -1) {
      // Remove the course from the wishlist
      student.wishlist.splice(courseIndexInWishlist, 1);
    }

    // Check if the course is already in the cart
    const isCourseInCart = student.cart.includes(courseId);

    if (!isCourseInCart) {
      // Add the course to the cart
      student.cart.push(courseId);

      // Update the cart total (assuming each course has a 'price' field)
      student.cartTotal += course.price;
    }

    // Save the updated student object
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Course removed from wishlist and added to cart successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//add ratings to course
exports.addRatings = async (req, res) => {
  try {
    const existingCourse = await Course.findOne({
      _id: req.params.courseId,
    });
    const isRatedindex = existingCourse?.ratings?.findIndex((rating) =>
      rating?.user?.equals(req.user._id)
    );
    if (isRatedindex !== -1) {
      return res.status(403).json({
        success: false,
        message: "Course has already been rated by user!",
      });
    }
    const course = await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      {
        $push: {
          ratings: {
            user: `${req.user._id}`,
            ratings: req.body.ratings,
            comment: req.body.comment,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Course has been rated by user!",
      course: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
//get all ratings of a course
exports.getRatings = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId }).populate(
      "ratings.user"
    );
    res.status(200).json({ success: true, ratings: course.ratings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
