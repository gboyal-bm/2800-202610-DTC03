/**
 * @fileoverview User journey and progress routes
 * @module routes/user_journey
 * 
 * @description Defines routes for managing user journeys and progress.
 */

// Imports

// External modules
const express = require("express");
const router = express.Router();

// Internal modules

const authMiddleware = require("../middleware/auth");

// Controllers
const {
    getExperience,
    addExperience,
    removeExperience,
    // getSavedActivities,
    // getTourStatus,
    // updateTourStatus,
    // saveActivity,
    // unsaveActivity
} = require("../controllers/user_journey");

// Routes

// Protected routes
router.use(authMiddleware.authenticate);
router.get("/experience", getExperience);
router.post("/experience", addExperience);
router.delete("/experience", removeExperience);



module.exports = router;
