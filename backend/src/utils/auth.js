/**
 * @fileoverview Helpers for handling sessions and user authentication
 * @module utils/auth
 * 
 * @description Provides utility functions for managing user sessions and authentication in the application..
 * @exports startSession
 */

// Imports

// Internal modules
const { REMEMBER_ME_COOKIE_AGE, PASSWORD_MIN_LENGTH, VALID_EMAIL_REGEX } = require("../constants");
const { daysToMilliseconds } = require("./conversions");

const startSession = (req, user, rememberMe) => {
    req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email
    };
    req.session.cookie.maxAge = rememberMe
        ? daysToMilliseconds(REMEMBER_ME_COOKIE_AGE)
        : null;
};

const validateNewUser = async (errorMessages, email, username, password) => {
    if (email.trim().length === 0) {
        errorMessages.push("Email cannot be empty.");
    }
    if (username.trim().length === 0) {
        errorMessages.push("Username cannot be empty.");
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
        errorMessages.push(
            `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
    }
    if (!VALID_EMAIL_REGEX.test(email)) {
        errorMessages.push("Email must be of valid format.");
    }
};

module.exports = {
    startSession,
    validateNewUser
};
