/**
 * @fileoverview Activity schema and model
 * @module models/activity
 * 
 * @description Defines the schema for activities with a location and description.
 * @exports Activity
 * 
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");


/**
 * @description Approved activities.
 * 
 * @typedef {Object} Activity
 * @property {string} name - The name of the activity
 * @property {string} location - The location of the activity
 * @property {string} category - The category of the activity
 * @property {string} description - The description of the activity
 */

/**
 * @description Activity schema.
 * 
 * @type {mongoose.Schema<Activity>}
 */
const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: [1, "Activity name cannot be empty."],
        trim: true,
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        minLength: [1, "Activity category name cannot be empty."],
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    }
});


/**
 * @description Activity model.
 * 
 * @type {mongoose.Model<Activity>}
 */
const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
