const User = require("../models/user.js");

const loginRedirectByRole = {
  user: "/listings",
  admin: "/listings/new",
};

const loginPathByRole = {
  user: "/user/login",
  admin: "/admin/login",
};

function authChoice(req, res) {
  res.render("users/choice.ejs");
}

async function signup(req, res) {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username, role: "user" });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        req.flash("error", "Unable to complete signup right now.");
        return res.redirect("/signup");
      }
      req.flash("success", "Welcome to Wandrer");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
}

function signupForm(req, res) {
  res.render("users/signup.ejs");
}

function userLoginForm(req, res) {
  res.render("users/login.ejs", {
    pageTitle: "User Login",
    pageSubtitle: "View listings and write reviews",
    actionPath: "/user/login",
    role: "user",
  });
}

function adminLoginForm(req, res) {
  res.render("users/login.ejs", {
    pageTitle: "Admin Login",
    pageSubtitle: "Add and manage listings",
    actionPath: "/admin/login",
    role: "admin",
  });
}

function login(role) {
  return async function loginHandler(req, res) {
    const userRole = String(req.user?.role || "user").trim().toLowerCase();
    const expectedRole = String(role).trim().toLowerCase();

    if (userRole !== expectedRole) {
      await new Promise((resolve) => req.logout(() => resolve()));
      req.flash("error", `Please use the ${expectedRole} login page for this account.`);
      return res.redirect(loginPathByRole[expectedRole]);
    }

    req.flash("success", expectedRole === "admin" ? "Welcome back, admin." : "Welcome back to Wandrer!");
    let redirectUrl = res.locals.redirectUrl || loginRedirectByRole[expectedRole];
    res.redirect(redirectUrl);
  };
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Unable to log out right now.");
      return res.redirect("/login");
    }
    req.flash("success", "You are logged out now");
    res.redirect("/login");
  });
}

module.exports = {
  authChoice,
  signup,
  signupForm,
  userLoginForm,
  adminLoginForm,
  login,
  logout,
};