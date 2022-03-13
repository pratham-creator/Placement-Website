const express = require("express");
const router = express.Router();

// controller
const { uploadImage } = require("../controllers/cloudinary");

router.post("/uploadImage", uploadImage);

module.exports = router;