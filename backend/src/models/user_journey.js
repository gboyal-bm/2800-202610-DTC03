/**
 * @fileoverview Saved activities and questing progress
 * @module models/user_journey
 * 
 * @description Defines the User Journey schema and model for game progress and saved activities.
 * @exports UserJourney
 * 
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");

// Internal modules

// Constants
const { TOURS_TRACKER } = require("../constants");

/**
 * @description User journeys for saved activities, badges, and experience.
 * 
 * @typedef {Object} UserJourney
 * @property {ObjectId} userId - The ID of the user
 * @property {Object} toursStatus - The user's completion status for each app tour
 * @property {Array<ObjectId>} savedActivities - The IDs of the user's saved activities
 * @property {Array<ObjectId>} savedItinerary - The IDs of the user's saved itineraies
 * @property {Date} updatedAt - The timestamp of the most recent update
 */

/**
 * @description User journey schema.
 * 
 * @type {mongoose.Schema<UserJourney>}
 */
const userJourneySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    toursStatus: {
        type: Object,
        default: { ...TOURS_TRACKER },
        required: true,
    },
    savedActivities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Activity",
        default: [],
        required: true,

    },
    savedItinerary: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Itinerary",
        default: [],
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});


/**
 * @description Pre-save middleware to update timestamp before saving.
 * 
 * @function
 * @description Update the timestamp.
 * @returns {Promise<void>}
 */
userJourneySchema.pre("save", async function () {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
});

/**
 * @description User journey model.
 * 
 * @type {mongoose.Model<UserJourney>}
 */
const UserJourney = mongoose.model("UserJourney", userJourneySchema);

module.exports = UserJourney;
