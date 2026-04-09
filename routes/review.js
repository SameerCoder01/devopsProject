const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const isUser = require("../middleware/isUser.js");
const isReviewAuthor = require("../middleware/isReviewAuthor.js");
const { createReview, deleteReview } = require("../controllers/review.js");
const validateReview = require("../middleware/validateReview.js");




router.post("/", isUser, validateReview ,wrapAsync(createReview));

router.delete("/:reviewId", isUser, isReviewAuthor,wrapAsync(deleteReview));

module.exports = router;