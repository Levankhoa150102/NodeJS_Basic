const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/productController");

router.use("/:id", productController.show);
router.use("/", productController.index);

module.exports = router;
