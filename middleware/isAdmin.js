module.exports = function isAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in as an admin to do that.");
        return res.redirect("/admin/login");
    }

    if (String(req.user?.role || "user").trim().toLowerCase() !== "admin") {
        req.flash("error", "Only admins can manage listings.");
        return res.redirect("/listings");
    }

    next();
};