/**
 * @fileoverview User journey controllers
 * @module models/user_journey
 *
 * @description Defines the journey for user progress
 * @exports getExperience
 * @exports addExperience
 * @exports removeExperience
 *
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");

// Internal modules

const UserJourney = require("../models/user_journey");

// Get user experience points

/**
 * @function getExperience
 *
 * @description Retrieves the user's current experience points from their user journey and returns it in the response.
 */
const getExperience = async (req, res) => {
    let userJourney = undefined;
    try {
        userJourney = await UserJourney.findOne({ userId: req.user.id });
    } catch (err) {
        return res.status(500).json({ message: "Server error: " + err.message });
    }
    if (!userJourney) {
        return res.status(404).json({ message: "User info not found" });
    }
    res.status(200).json({ experience: userJourney.experience });
};

// Add experience points to user journey

/**
 * @function addExperience
 *
 * @description Adds experience points to the user's current total in their user journey and returns the updated total in the response.
 */
const addExperience = async (req, res) => {
    const { experience } = req.body;
    if (typeof experience !== "number" || experience <= 0) {
        return res.status(400).json({ message: "Experience must be a positive number" });
    }
    let userJourney = undefined;
    try {
        userJourney = await UserJourney.findOneAndUpdate(
            { userId: req.user.id },
            { $inc: { experience } },
            { returnDocument: "after" }
        );
    } catch (err) {
        return res.status(500).json({ message: "Server error: " + err.message });
    }
    if (!userJourney) {
        return res.status(404).json({ message: "User info not found" });
    }
    res.status(200).json({ experience: userJourney.experience });
};

// Remove experience points from user journey

/**
 * @function removeExperience
 *
 * @description Removes experience points from the user's current total in their user journey and returns the updated total in the response.
 */
const removeExperience = async (req, res) => {
    const { experience } = req.body;
    if (typeof experience !== "number" || experience <= 0) {
        return res.status(400).json({ message: "Experience must be a positive number" });
    }
    let userJourney = undefined;
    try {
        userJourney = await UserJourney.findOneAndUpdate(
            { userId: req.user.id },
            { $inc: { experience: -experience } },
            { returnDocument: "after" }
        );
    } catch (err) {
        return res.status(500).json({ message: "Server error: " + err.message });
    }
    if (!userJourney) {
        return res.status(404).json({ message: "User info not found" });
    }
    res.status(200).json({ experience: userJourney.experience });
};

module.exports = { getExperience, addExperience, removeExperience };
