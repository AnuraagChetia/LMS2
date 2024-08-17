const Course = require("../models/courseModel");
const Teacher = require("../models/teacherModel");

//create a new course
exports.addCourse = async (req, res) => {
  try {
    //check if user is instructor
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }
    const instructor = req.user._id;
    const {
      title,
      description,
      price,
      duration,
      level,
      category,
      tags,
      headline,
      language,
    } = req.body;
    if (
      !title ||
      !description ||
      !instructor ||
      !price ||
      !duration ||
      !level ||
      !category ||
      !headline ||
      !language ||
      !tags
    ) {
      res.status(400);
      throw new Error("Please enter all fields");
    }
    let course = await Course.create({
      title: title,
      description: description,
      instructor: instructor,
      price: price,
      duration: duration,
      level: level,
      category: category,
      headline: headline,
      language: language,
      tags: tags,
      ratings: [],
    });
    if (course) {
      const updatedTeacher = await Teacher.findOneAndUpdate(
        {
          user: instructor,
        },
        {
          $push: { courses: course._id },
        },
        {
          new: true,
        }
      );
      res.status(201).json({
        success: true,
        message: "Course has been created",
        course: course,
        teacher: updatedTeacher,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Course creation failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get course with populated modules
exports.getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findOne({ _id: courseId })
      .populate("modules")
      .populate("instructor")
      .populate({
        path: "instructor",
        populate: {
          path: "teacher",
        },
      });

    if (course.status === "deactivated")
      return res.status(403).json({
        success: false,
        message: "The desired course has been suspended",
      });
    res.status(201).json({ sucess: true, course: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//delete course
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    //check if course exists
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course doesn't exist!" });
    }

    //make sure user is authorized to delete that course
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const teacher = await Teacher.findOne({ user: req.user._id });

    //check if course owner is the current user
    if (!teacher.courses.find((course) => course.equals(courseId))) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to delete this course!",
      });
    }

    const deletedCourse = await Course.findOneAndDelete({ _id: courseId });

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: {
          courses: courseId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse: deletedCourse,
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

//update course details
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    //check if course exists
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course doesn't exist!" });
    }

    //make sure user is authorized to delete that course
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const teacher = await Teacher.findOne({ user: req.user._id });

    //check if course owner is the current user
    if (!teacher.courses.find((course) => course.equals(courseId))) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to delete this course!",
      });
    }

    const { title, description, price, duration, level, category, tags } =
      req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        title: title,
        description: description,
        instructor: req.user._id,
        price: price,
        duration: duration,
        level: level,
        category: category,
        tags: tags,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course details successfully updated",
      course: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//activate course by instructor
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

    //make sure user is authorized to activate that course
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const teacher = await Teacher.findOne({ user: req.user._id });

    //check if course owner is the current user
    if (!teacher.courses.find((course) => course.equals(courseId))) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to activate this course!",
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

//deactivate course by instructor
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

    //make sure user is authorized to activate that course
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const teacher = await Teacher.findOne({ user: req.user._id });

    //check if course owner is the current user
    if (!teacher.courses.find((course) => course.equals(courseId))) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to deactivate this course!",
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
      message: "Course has been deactivated!",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};

//get all courses
exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ status: "active" }).populate({
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

//post a question
exports.postQuestion = async (req, res) => {
  try {
    const newQuestion = {
      question: {
        sender: `${req.user.userName}`,
        comment: req.body.comment,
        time: req.body.time,
      },
      replies: [], // Empty replies array initially
    };

    const course = await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      {
        $push: {
          QnA: newQuestion,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Your question has been posted.",
      course: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//post reply to question
exports.postReply = async (req, res) => {
  try {
    const newReply = {
      sender: `${req.user.userName}`,
      comment: req.body.comment,
      time: req.body.time,
    };
    const course = await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      {
        $push: {
          [`QnA.${req.body.questionIndex}.replies`]: newReply,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Your reply has been posted.",
      course: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
