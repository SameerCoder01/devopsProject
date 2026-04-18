const Listing = require("../models/listing.js")

async function isOwner(req, res, next) {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = isOwner;
