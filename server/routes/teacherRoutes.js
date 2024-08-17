const express = require("express");

const teacherController = require("../controller/teacherController");
const courseController = require("../controller/courseController");

const userAuthentication = require("../middlewares/auth");
const courseThubnailSaver = require("../middlewares/courseThubnailSaver");

const router = express.Router();

// Get all courses by the instructor
router.get("/get-courses", userAuthentication, teacherController.getCourses);

// update teacher details
router.put("/update", userAuthentication, teacherController.addDetails);

//delete course by course owner
router.delete(
  "/delete-course/:courseId",
  userAuthentication,
  courseController.deleteCourse
);

//De-activate a course
router.put(
  "/deactivate-course/:courseId",
  userAuthentication,
  courseController.deactivateCourse
);

//activate course
router.put(
  "/activate-course/:courseId",
  userAuthentication,
  courseController.activateCourse
);

//update course
router.put(
  "/update-course/:courseId",
  userAuthentication,
  courseThubnailSaver.single("file"),
  courseController.updateCourse
);
module.exports = router;
