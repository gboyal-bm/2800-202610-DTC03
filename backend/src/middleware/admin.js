/**
 * @fileoverview Middleware for admin verification
 * @module middleware/admin
 * 
 * @description Middleware to verify if the user has admin privileges before allowing access to certain routes.
 */

/**
 * @function
 * @description Middleware function to check if the user is an admin. If the user is not an admin, a 403 Forbidden response is sent. If the user is an admin, the request is allowed to proceed.
 */
module.exports = function (req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required",
        });
    }
    next();
};
