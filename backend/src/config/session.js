/**
 * @fileoverview Express session configuration
 * @module config/session
 * 
 * @description Defines the configuration for Express sessions.
 */

// Imports
const session = require("express-session")

const SESSION_SCHEMA = {
    secret: SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}

module.exports = session(SESSION_SCHEMA);