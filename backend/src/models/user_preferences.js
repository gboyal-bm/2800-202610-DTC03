/**
 * @fileoverview User preferences schema and model
 * @module models/user_preferences
 * 
 * @description Defines the User preferences schema and model for settings and user attributes.
 * @exports UserPreferences
 * 
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");

// Internal modules

// Constants
const { DEFAULT_THEME, THEME_OPTIONS } = require("../constants");


/**
 * @description User preferences for first time tour, theme, and more.
 * 
 * @typedef {Object} UserPreferences
 * @property {boolean} viewTour - Whether the user wants to see tours
 * @property {string} theme - The user's preferred theme
 * @property {Date} updatedAt - The timestamp of preferences most recent update
 */

/**
 * @description User preferences schema.
 * 
 * @type {mongoose.Schema<UserPreferences>}
 */
const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    viewTour: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
        default: DEFAULT_THEME,
        enum: THEME_OPTIONS,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

/**
 * @description Pre-save middleware to update timestamp before saving preferences.
 * 
 * @function
 * @description Update the timestamp.
 * @returns {Promise<void>}
 */
userPreferencesSchema.pre("save", async function () {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
});

/**
 * @description User preferences model.
 * 
 * @type {mongoose.Model<UserPreferences>}
 */
const UserPreferences = mongoose.model("UserPreferences", userPreferencesSchema);

module.exports = UserPreferences;
