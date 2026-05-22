/**
 * @fileoverview Activities routes
 * @module routes/activity
 *
 * @description Defines routes for finding and managing activities.
 */

// Imports

// External modules
const express = require("express");
const router = express.Router();

// Internal modules

const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

// Controllers
const {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
} = require("../controllers/activity");

// Routes

// Find activities
router.get("/", getActivities);
router.get("/:id", getActivityById);

// Protected routes
router.use(authMiddleware.authenticate);
router.use(admin);

router.post("/create", createActivity);
router.put("/update/:id", updateActivity);
router.delete("/delete/:id", deleteActivity);

module.exports = router;
