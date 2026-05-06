/**
 * @fileoverview Authentication and account management routes
 * @module routes/auth
 * 
 * @description Defines routes for user authentication and account management.
 */

// Imports

// External modules
const express = require("express");
const router = express.Router();

// Internal modules

// Controllers
const {
    register,
    login,
    logout,
    me
} = require("../controllers/authController.js");

// Routes

// Authentication
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.use(authMiddleware.authenticate);
router.post("/logout", logout);
router.get("/me", me);

module.exports = router;
