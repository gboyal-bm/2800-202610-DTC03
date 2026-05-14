/**
 * @fileoverview Helmet configuration
 * @module config/helmet
 *
 * @description Defines the configuration for helmet.
 */

// Imports
const helmet = require("helmet");

module.exports = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: [
                "'self'",
                "https://*.googleapis.com",
                "https://*.gstatic.com",
            ],
            frameSrc: ["https://www.google.com"],
        },
    },
});
