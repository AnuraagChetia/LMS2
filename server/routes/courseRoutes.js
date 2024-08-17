const express = require("express");

const courseController = require("../controller/courseController");
const moduleController = require("../controller/moduleController");

const upload = require("../middlewares/multerMiddleware");
const userAuthentication = require("../middlewares/auth");
const courseThubnailSaver = require("../middlewares/courseThubnailSaver");

const router = express.Router();

router.post("/add", userAuthentication, courseController.addCourse);

router.post("/module/add/:id", userAuthentication, moduleController.addModule);

router.get("/all", courseController.getAllCourse); // fetches all courses in the website

router.get("/get-lecture/:moduleId/:lectureId", moduleController.getLecture);

router.get("/:courseId", courseController.getCourse); // fetches the specific course

router.post(
  //upload lecture
  "/module/lecture/upload/:moduleId/",
  userAuthentication,
  upload.single("file"),
  moduleController.uploadLecture
);

router.post(
  //comment lecture
  "/module/lecture/comment/:moduleId",
  userAuthentication,
  moduleController.commentLecture
);

router.put(
  //update lecture
  "/module/update-lecture/:moduleId/:lectureId",
  userAuthentication,
  upload.single("file"),
  moduleController.editLecture
);

router.delete(
  //delete lecture
  "/module/delete-lecture/:moduleId/:lectureId",
  userAuthentication,
  moduleController.deleteLecture
);

router.put(
  //update module
  "/module/update/:courseId",
  userAuthentication,
  moduleController.updateModule
);

router.delete(
  //delete module
  "/module/delete/:courseId/:moduleId",
  userAuthentication,
  moduleController.deleteModule
);

router.delete(
  //delete course
  "/delete/:courseId",
  userAuthentication,
  courseController.deleteCourse
);

//post a new question
router.post(
  "/post-question/:courseId",
  userAuthentication,
  courseController.postQuestion
);

//reply to an existing question
router.post(
  "/post-reply/:courseId",
  userAuthentication,
  courseController.postReply
);

module.exports = router;
