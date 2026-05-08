/**
 * @fileoverview User authentication/authorization middleware
 * @module middleware/auth
 * 
 * @description Defines middleware for user authentication and authorization.
 * @exports authenticate
 * @exports validateNewUser
 * 
 * @author Alex Lu
 */

// Imports

// Internal modules
const User = require("../models/user");
const { validateNewUserFields } = require("../utils/auth");


/**
 * @function authenticate
 * @description Authenticates user before allowing access to protected routes.
 * 
 * @param {Object} req
 * @param {Object} res 
 * @param {Function} next 
 */
const authenticate = (req, res, next) => {
    if (!(req.session?.user)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = req.session.user;
    next();
};

/**
 * @function validateNewUser
 * @description Validates the input for a new user registration.
 * 
 * @param {Object} req
 * @param {Object} res 
 * @param {Function} next 
 */
const validateNewUser = async (req, res, next) => {
    const { email, username, password, rememberMe } = req.body;
    const errorMessages = [];

    validateNewUserFields(errorMessages, email, username, password);

    if (errorMessages.length > 0) {
        return res.status(400).json({
            message: "Invalid field",
            errors: errorMessages
        });
    }

    const userExists = await User.exists({ email });
    if (userExists) {
        return res.status(409).json({
            message: "Account already exists"
        });
    }
    next();
};

module.exports = {
    authenticate,
    validateNewUser
};
