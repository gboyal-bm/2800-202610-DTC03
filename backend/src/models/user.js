/**
 * @fileoverview User schema and model
 * @module models/user
 * 
 * @description Defines the User schema and model for account authentication.
 */

// Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Constants
const { SALT_ROUNDS } = require("../constants");

/**
 * @description User account.
 * 
 * @typedef {Object} User
 * @property {string} username - The user's public username
 * @property {string} email - The user's email address
 * @property {string} password - The user's encrypted password
 * @property {Date} createdAt - The timestamp of user creation
 * 
 * Modified from Claude Sonnet 4.6 snippet.
 */

/**
 * @description User account schema.
 * 
 * @type {mongoose.Schema<User>}
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [1, "Username cannot be empty."],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Email must be of valid format."]
    },
    password: {
        type: String,
        required: true,
        minLength: [1, "Password cannot be empty."],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

/**
 * @description Hash the password before saving.
 * 
 * @function
 * @param {Function} next - The callback to the next middleware
 * @returns {Promise<void>}
 */
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
    next();
});

/**
 @description Compare password attempt to stored password.
 * 
 * @param {string} passwordAttempt - The plaintext password attempt
 * @returns {Promise<boolean>}     - Whether the password attempt is correct
 *                                     true if correct 
 */
userSchema.methods.comparePassword = async function (passwordAttempt) {
    return await bcrypt.compare(passwordAttempt, this.password);
};

/**
 * @description User account model.
 * 
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
