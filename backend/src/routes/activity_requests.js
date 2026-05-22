/**
 * @fileoverview Routes for activity requests
 * @module routes/activity_requests
 *
 * @description Defines routes for managing activity requests, including creating new requests and approving or denying existing requests. Access to certain routes is restricted to admin users.
 * @exports router
 */

// Imports
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const controller = require("../controllers/activity_request");

router.use(auth.authenticate);

// Create new activity request
router.post("/", controller.createRequest);

// Admin routes
router.use(admin);

// View all activity requests
router.get("/", controller.getRequests);

// Approve or deny activity request
router.patch("/:id", controller.updateRequestStatus);

module.exports = router;
