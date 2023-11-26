const express = require("express");
const router = express.Router();
const AdminController = require("../app/controllers/adminController");

router.use("/test", AdminController.test);
router.use("/", AdminController.index);

module.exports = router;
