const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");
const isAdmin = require("../middleware/isAdmin.js");
const { index, renderNewForm, showListing, createListing, renderEditForm, updateListing, deleteListing } = require("../controllers/listing.js");
const { validateListing } = require("../middleware/validateListing.js");
const upload = require("../middleware/multer");

router.get("/", isLoggedIn, wrapAsync(index));

router.post("/", isAdmin, validateListing, upload.single("image"), wrapAsync(createListing));

router.get("/new", isAdmin, renderNewForm);

router.get("/:id", isLoggedIn, wrapAsync(showListing));

router.put("/:id", isAdmin, validateListing, upload.single("image"), wrapAsync(updateListing));

router.delete("/:id", isAdmin, wrapAsync(deleteListing));

router.get("/:id/edit", isAdmin, wrapAsync(renderEditForm));

module.exports = router;