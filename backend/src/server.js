/**
 * @fileoverview Shadesmar API server entrypoint
 * @module server
 *
 * @description Initializes and starts the Shadesmar API server.
 */

// Main setup
require("dotenv").config();

const express = require("express");
const app = express();

// ENV variables
const PORT = process.env.PORT || 3001;

// Imports

// External modules
const mongoose = require("mongoose");
const session = require("express-session");

// Internal modules
const sessionConfig = require("./config/session");
const helmetConfig = require("./config/helmet");
const {connectDB} = require("./utils/database");

// Routes
const authRoutes = require("./routes/auth");

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
    app.use(helmetConfig);
    // app.use(
    //     helmet({
    //         contentSecurityPolicy: {
    //             directives: {
    //                 defaultSrc: ["'self'"],
    //                 connectSrc: ["'self'"],
    //                 scriptSrc: ["'self'"],
    //                 styleSrc: ["'self'"],
    //                 imgSrc: ["'self'"],
    //             },
    //         },
    //     })
    // );
    app.use(sessionConfig);

    // Start
    app.use(express.json());

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
