/**
 * @fileoverview Debugging utilities
 * @module utils/debug
 *
 * @description Provides utility functions for debugging the server.
 * @exports debugIncomingRequest
 *
 * @author Alex Lu
 */

/**
 * @function debugIncomingRequest
 * @description Logs incoming requests for debugging purposes.
 */
function debugIncomingRequest(req, res, next) {
    console.log(`
-------------------------------------------
    Request: ${req.method} ${req.url}

        Body: ${JSON.stringify(req.body)}

        Session: ${JSON.stringify(req.session)}
-------------------------------------------
    `);
    next();
}

module.exports = { debugIncomingRequest };
