const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const userAuthentication = require("../middlewares/auth");
const userAvatarSaver = require("../middlewares/userAvatarSaver");

router.get("/get-coupons", userController.getAllCoupons);

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forget-password", userController.forgetPassword);
router.get("/reset-password", userController.resetPassword);
router.put(
  // change password from account settings
  "/change-password-settings",
  userAuthentication,
  userController.changePasswordSettings
);
router.post("/change-password/:resetId", userController.changePassword); // change password using forget password

router.put("/change-email", userAuthentication, userController.changeEmail); // change email

router.put("/update-profile", userAuthentication, userController.updateProfile); //update profile

router.delete("/delete-user", userAuthentication, userController.deleteUser); //delete user

//update profile picture
router.put(
  "/update-avatar",
  userAuthentication,
  userAvatarSaver.single("file"),
  userController.updateProfilePicture
);

// contact me form api
router.post("/post-message", userController.contactMeApi);

module.exports = router;
