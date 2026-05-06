/**
 * @fileoverview Shadesmar API server entrypoint
 * @module server
 * 
 * @description Initializes and starts the Shadesmar API server.
 */

// Main setup
const express = require("express");
const app = express();

// ENV variables
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const SESSION_KEY = process.env.SESSION_KEY;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// Imports

// External modules 
const mongoose = require("mongoose");
const session = require("express-session");

// Internal modules
const sessionConfig = require("./config/session");

// Routes
const authRoutes = require("./routes/auth");

// Start server

if (typeof require !== 'undefined' && require.main === module) {
    main();
}

// Constants
// - Values
// - Schemas

// Values


if (require.main === module) {
    main();
}

function main() {
    // Setup
    app.use(sessionConfig);

    // Start
    app.use(express.urlencoded({ extended: true }));

    // User Login
    app.use("/api/auth", authRoutes);

    // Protected routes
    app.get("/home", (req, res) => {
        res.send("Going home");
    });

    // Start listening
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

