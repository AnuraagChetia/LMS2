const express = require("express");
const router = express.Router();

const userAuthentication = require("../middlewares/auth");
const studentController = require("../controller/studentController");

//add ratings to a course
router.put(
  "/course/rate/:courseId",
  userAuthentication,
  studentController.addRatings
);

//get all ratings of a course
router.get(
  "/course/get-ratings/:courseId",
  userAuthentication,
  studentController.getRatings
);

router.post(
  "/add-to-cart/:courseId",
  userAuthentication,
  studentController.addToCart
);

router.delete(
  "/remove-from-cart/:courseId",
  userAuthentication,
  studentController.removeFromCart
);

//add to wishlist and remove from cart
router.put(
  "/add-to-wishlist/:courseId",
  userAuthentication,
  studentController.addToWishlist
);

//remove from wishlist
router.put(
  "/remove-from-wishlist/:courseId",
  userAuthentication,
  studentController.removeFromWishlist
);

//remove from wishlist and add to cart
router.put(
  "/remove-and-add-to-cart/:courseId",
  userAuthentication,
  studentController.removeFromWishlistAndAddToCart
);

//check coupon
router.post("/check-coupon", userAuthentication, studentController.checkCoupon);

router.post("/buy-course/", userAuthentication, studentController.orderCourse);

router.post(
  "/success-payment/",
  userAuthentication,
  studentController.successPayment
);
router.post(
  "/failed-payment/",
  userAuthentication,
  studentController.failedPayment
);

module.exports = router;
