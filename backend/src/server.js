/**
 * @fileoverview Shadesmar API server entrypoint
 * @module server
 *
 * @description Initializes and starts the Shadesmar API server.
 */

// Main setup
require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const app = express();

// ENV variables
const PORT = process.env.PORT || 3001;

// Imports

// External modules
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

// Internal modules
const sessionConfig = require("./config/session");
const helmetConfig = require("./config/helmet");
const { connectDB } = require("./utils/database");
const { debugIncomingRequest } = require("./utils/debug");

// Routes
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activity");
const activityRequestRoutes = require("./routes/activity_requests");
const userJourneyRoutes = require("./routes/user_journey");
// const userPreferencesRoutes = require("./routes/user_preferences");
const aiRoutes = require("./routes/ai");
// Start server

if (require.main === module) {
    main();
}

/**
 * @function main
 * @description Drives the program.
 */
async function main() {
    // Connect to database
    const dbConnected = await connectDB();
    if (!dbConnected) {
        return console.log("Failed to connect to database");
    } else {
        console.log("Connected to database");
    }

    // Setup
    app.use(express.static(path.join(__dirname, "client/dist")));
    app.use(helmetConfig);
    app.use(sessionConfig);

    // Start
    app.use(express.json());

    // Test
    if (process.env.NODE_ENV == "development") {
        app.use(debugIncomingRequest);
    }

    // User Login
    app.use("/api/auth", authRoutes);

    // TODO: Activities
    app.use("/api/activities", activityRoutes);

    // Activity requests
    app.use("/api/activity-requests", activityRequestRoutes);

    // User management
    app.use("/api/user", userJourneyRoutes);

    // TODO: User preferences
    // app.use("/api/user/preferences", userPreferencesRoutes);

    // AI
    app.use("/api/ai", aiRoutes);

    // Fallback to send page
    app.get("/{*path}", (req, res) => {
        res.sendFile(path.join(__dirname, "client/dist", "index.html"));
    });

    // Start listening
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
