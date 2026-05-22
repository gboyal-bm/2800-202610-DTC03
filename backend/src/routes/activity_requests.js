const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const controller = require("../controllers/activity_request");

router.use(auth.authenticate);

router.post("/", controller.createRequest);

router.get("/", admin, controller.getRequests);

router.patch("/:id", admin, controller.updateRequestStatus);

module.exports = router;
