module.exports = function isUser(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in as a user to do that.");
        return res.redirect("/user/login");
    }

    if (String(req.user?.role || "user").trim().toLowerCase() !== "user") {
        req.flash("error", "Please use the admin portal for this account.");
        return res.redirect("/listings");
    }

    next();
};