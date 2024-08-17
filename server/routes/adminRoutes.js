const express = require("express");

const router = express.Router();

const userAuthentication = require("../middlewares/auth");

const adminController = require("../controller/adminController");

const resumeSaver = require("../middlewares/resumeSaver");

//add new job opening
router.post(
  "/career/jobs/add",
  userAuthentication,
  adminController.addNewJobOpening
);

//update a job opening
router.put(
  "/career/jobs/update/:jobId",
  userAuthentication,
  adminController.updateJobOpening
);

//delete job opening
router.delete(
  "/career/jobs/delete/:jobId",
  userAuthentication,
  adminController.deleteJobOpening
);

router.get("/get-courses", userAuthentication, adminController.getAllCourse);

//activate a course
router.put(
  "/activateCourse/:courseId",
  userAuthentication,
  adminController.activateCourse
);

//deactivate a course
router.put(
  "/deactivateCourse/:courseId",
  userAuthentication,
  adminController.deactivateCourse
);

//delete a course
router.delete(
  "/delete/course/:courseId",
  userAuthentication,
  adminController.deleteCourse
);

//get all users
router.get(`/get-users`, userAuthentication, adminController.getAllUsers);

//get all teachers
router.get("/get-teachers", userAuthentication, adminController.getAllTeachers);

//activate user
router.put(
  "/activate/:userId",
  userAuthentication,
  adminController.activateUser
);

//suspend user
router.put("/suspend/:userId", userAuthentication, adminController.suspendUser);

//delete a user
router.delete(
  "/delete/user/:userId",
  userAuthentication,
  adminController.deleteUser
);

//create discount coupon codes
router.post("/coupon/create", userAuthentication, adminController.createCoupon);

//activate coupom
router.put(
  "/coupon/activate-coupon/:couponId",
  userAuthentication,
  adminController.activateCoupon
);
//deactivate coupom
router.put(
  "/coupon/suspend-coupon/:couponId",
  userAuthentication,
  adminController.deactivateCoupon
);
//delete coupom
router.put(
  "/coupon/delete-coupon/:couponId",
  userAuthentication,
  adminController.deleteCoupon
);

//get all jobs
router.get("/career/jobs", adminController.getAllJobs);

//get specific job
router.get("/career/job/:jobId", adminController.getJob);

//post a application for a job
router.post(
  "/career/job/submit-application",
  resumeSaver.single("file"),
  adminController.jobApply
);

//get all applicants for a specific job
router.get(
  "/career/job/get-applicants/:jobId",
  userAuthentication,
  adminController.getJobApplicants
);

//get applicant resume
router.get("/pdf/:applicantId", adminController.getResume);

//get all orders
router.get("/get-orders", userAuthentication, adminController.getAllOrder);

//get all contacts
router.get("/get-contacts", userAuthentication, adminController.getAllContacts);

//create new affiliate
router.post(
  "/create-affiliate",
  userAuthentication,
  adminController.createNewAffiliate
);

//edit new affiliate
router.put(
  "/edit-affiliate/:affiliateId",
  userAuthentication,
  adminController.editAffiliate
);

//get all routes
router.get(
  "/get-affiliates",
  userAuthentication,
  adminController.getAffiliates
);

module.exports = router;
