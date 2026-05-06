/**
 * @fileoverview Authentication and account management controllers
 * @module controllers/auth
 * 
 * @description Defines controllers for user authentication and account management.
 * @exports register
 * @exports login
 * @exports logout
 * @exports me
 */

// Imports

// Internal modules

const { startSession, validateNewUser } = require("../utils/auth");

const User = require("../models/user");

const register = async (req, res) => {
    const { email, username, password, rememberMe } = req.body;
    const errorMessages = [];

    validateNewUser(errorMessages, email, username, password);

    if (errorMessages.length > 0) {
        return res.status(400).json({
            message: "Invalid field",
            errors: errorMessages
        });
    }

    const userExists = await User.exists({ email });
    if (userExists) {
        errorMessages.push("Account already exists.");
        return res.status(409).json({
            message: "Account already exists"
        });
    }
    return errorMessages;

    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({
                message: "Validation error on creation",
                errors: messages
            });
        }
        // Server error
        return res.status(500).json({
            message: "Server error: " + err.message
        });
    }

    // Success
    startSession(req, newUser, rememberMe);
    res.status(201).redirect("/home");
};

const login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordCorrect = await user.comparePassword(password);
    if (!passwordCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    startSession(req, user, rememberMe);
    res.status(200).json({ message: "Login successful" });
}

const logout = async (req, res) => { }
const me = async (req, res) => { }

module.exports = {
    register,
    login,
    logout,
    me
};
