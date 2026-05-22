/**
 * @fileoverview Model for activity requests
 * @module models/activity_requests
 *
 * @description Defines the structure for activity requests in the database
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} ActivityRequest
 * @description A request made by a user to add a new activity.
 * 
 * @property {string} name - The name of the requested activity
 * @property {string} location - The location of the requested activity
 * @property {string} category - The category of the requested activity
 * @property {string} description - The description of the requested activity
 * @property {mongoose.Schema.Types.ObjectId} requestedBy - The user who requested the activity
 * @property {string} status - The status of the requested activity
 */
const activityRequestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "denied"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ActivityRequest", activityRequestSchema);
