const Teacher = require("../models/teacherModel");
const Course = require("../models/courseModel");
exports.addDetails = async (req, res) => {
  try {
    const { specialization, bio, education, experience } = req.body;
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { user: req.user._id },
      {
        specialization: specialization,
        bio: bio,
        education: education,
        experience: experience,
      },
      { new: true }
    );

    if (updatedTeacher) {
      return res.status(201).json({
        success: true,
        message: "Instructor details updated successful",
        teacher: updatedTeacher,
      });
    } else {
      res.status(400).json({
        succes: false,
        message: "Failed to update instructor details",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

// @desc gets the courses by the teacher
exports.getCourses = async (req, res) => {
  try {
    const user = req.user;
    // check if the user is a valid teacher or not
    if (user.role !== "teacher")
      return res
        .status(400)
        .json({ success: false, message: "User is not a teacher !f" });

    const courses = await Course.find({ instructor: user._id }).populate(
      "modules"
    );
    res.status(200).json({ success: true, courses: courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
