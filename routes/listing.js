const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapasync(listingController.index))
 .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapasync(listingController.renderCreateForm));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapasync(listingController.renderShowForm))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapasync(listingController.renderUpdateForm))
.delete(isLoggedIn,isOwner,wrapasync(listingController.renderDeleteForm));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingController.renderEditForm));


module.exports = router;
