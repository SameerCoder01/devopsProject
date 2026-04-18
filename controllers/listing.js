const Listing = require("../models/listing.js");
const getImagekit = require("../imagekitconfig.js");

async function index(req, res) {
  const data = await Listing.find({});
  res.render("listing/index.ejs", { data });
}

function renderNewForm(req, res) {
  res.render("listing/new.ejs");
}

async function showListing(req, res) {
  let { id } = req.params;
  const data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (data) {
    return res.render("listing/show.ejs", { data });
  }

  req.flash("error", "Listing you requrested does not exist");
  res.redirect("/listings");
}

async function createListing(req, res) {
  if (!req.file) {
    req.flash("error", "Please upload an image for the listing.");
    return res.redirect("/listings/new");
  }

  const listing = new Listing(req.body.listing);
  const file = req.file;
  const imagekit = getImagekit();

  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${b64}`;

  const result = await imagekit.upload({
    file: dataURI,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/wandrer/listings",
  });

  listing.owner = req.user._id;
  listing.image.url = result.url;
  listing.image.filename = result.name;
  listing.image.fileId = result.fileId;
  await listing.save();

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
}

async function renderEditForm(req, res) {
  let { id } = req.params;
  const data = await Listing.findById(id);
  if (data) {
    return res.render("listing/edit.ejs", { data });
  }

  req.flash("error", "Listing you requrested does not exist");
  res.redirect("/listings");
}

async function updateListing(req, res) {
  let { id } = req.params;
  let { listing } = req.body;

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...listing },
    { runValidators: true, returnDocument: "after" },
  );

  if (req.file) {
    const imagekit = getImagekit();
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const uploadResult = await imagekit.upload({
      file: dataURI,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/wandrer/listings",
    });

    if (updatedListing?.image?.fileId) {
      try {
        await imagekit.deleteFile(updatedListing.image.fileId);
      } catch (error) {
        console.warn("Unable to delete the previous listing image from ImageKit:", error);
      }
    }

    updatedListing.image = {
      url: uploadResult.url,
      filename: uploadResult.name,
      fileId: uploadResult.fileId,
    };
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
}

async function deleteListing(req, res) {
  let { id } = req.params;
  const data = await Listing.findById(id);

  if (data?.image?.fileId) {
    try {
      const imagekit = getImagekit();
      await imagekit.deleteFile(data.image.fileId);
    } catch (error) {
      console.warn("Unable to delete the listing image from ImageKit:", error);
    }
  }

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}

module.exports = {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
};
