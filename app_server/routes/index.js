var express = require("express");
var router = express.Router();
var homepageController = require("../controllers/main");

/* GET home page. */
router.get("/", homepageController.index);

module.exports = router;
