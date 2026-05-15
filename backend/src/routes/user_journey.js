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
    get,
    updateUserJourney
} = require("../controllers/user_journey");

// Routes

// Authentication
router.post("/register", authMiddleware.validateNewUser, register);
router.post("/login", login);

// Protected routes
router.use(authMiddleware.authenticate);
router.post("/logout", logout);
router.get("/me", getMe);

module.exports = router;
