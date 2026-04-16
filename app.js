require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("node:path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const saveRedirectUrl = require("./middleware/saveRedirectUrl.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { userLoginForm, adminLoginForm, login: roleLogin } = require("./controllers/user.js");




const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js")
const usersRouter = require("./routes/user.js")

const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devopsproject";
const port = Number(process.env.PORT) || 8080;

main()
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoURL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret : process.env.SESSION_SECRET || "dev-only-session-secret",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.isAdmin = !!(req.user && String(req.user.role || "").toLowerCase() === "admin");
    res.locals.isUser = !!(req.user && String(req.user.role || "").toLowerCase() === "user");
    next();
})



app.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    res.redirect("/listings");
});

app.get("/user/login", userLoginForm);
app.get("/admin/login", adminLoginForm);

app.post(
    "/user/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: true,
    }),
    wrapAsync(roleLogin("user")),
);

app.post(
    "/admin/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/admin/login",
        failureFlash: true,
    }),
    wrapAsync(roleLogin("admin")),
);

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", usersRouter);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500 } = err;
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});