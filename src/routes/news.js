const express = require("express");
const router = express.Router();
const newsController = require("../app/controllers/newsController");

router.use("/", newsController.index);

module.exports = router;
