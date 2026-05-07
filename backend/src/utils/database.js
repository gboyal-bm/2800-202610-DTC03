/**
 * @fileoverview Database connection and configuration
 * @module utils/database
 *
 * @description Defines helpers for database connection and configuration.
 * @exports connectDB
 *
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");

/**
 * @function connectDB
 * @description Connects to the MongoDB database.
 *
 * @returns {Promise<boolean>} - Whether the connection was successful
 *                                true if succeeded
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
        return false;
    }
    console.log("Connected to Shadesmar database");
    return true;
};

module.exports = {
    connectDB,
};
