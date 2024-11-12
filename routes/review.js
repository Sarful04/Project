const express = require("express");
const router = express.Router({mergeParams : true});
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/expresserror.js");
const {isLoggedIn,validateReview, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//Post Review route
router.post("/",isLoggedIn,validateReview,wrapasync(reviewController.createReview));

//delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapasync(reviewController.deleteReview));

module.exports = router;