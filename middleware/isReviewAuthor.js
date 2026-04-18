const review = require("../models/review.js");
const Review = require("../models/review.js")

async function isReviewAuthor(req, res, next) {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of the review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = isReviewAuthor;