/**
 * @fileoverview Express session configuration
 * @module config/session
 *
 * @description Defines the configuration for Express sessions.
 */

// Imports
const session = require("express-session");
const mongoose = require("mongoose");
const { MongoStore } = require("connect-mongo");

// Constants
const { SESSION_NAME } = require("../constants");

module.exports = session({
    name: SESSION_NAME,
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI,
        mongooseConnection: mongoose.connection,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
});
