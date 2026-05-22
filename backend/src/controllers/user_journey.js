/**
 * @fileoverview User journey controllers
 * @module models/user_journey
 *
 * @description Defines the journey for user progress
 * @exports UserJourney
 *
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");

// Internal modules

const UserJourney = require("../models/user_journey");

// Get user experience points

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

// Constants
module.exports = { getExperience, addExperience, removeExperience };
