/**
 * @fileoverview Activity controllers
 * @module controllers/activity
 * 
 * @description Defines controller functions for managing activities.
 * @exports getActivities
 * @exports getActivityById
 * @exports createActivity
 * @exports updateActivity
 * @exports deleteActivity
 * 
 * @author Alex Lu
 */

// Imports

// External modules
const mongoose = require("mongoose");

// Internal modules

const Activity = require("../models/activity");

// Find activities

const getActivities = async (req, res) => {
    let activities = undefined;
    try {
        activities = await Activity.find();
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Server error: " + err.message });
    }
    res.status(200).json({
        count: activities.length,
        results: activities
    });
};

const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
    } catch (err) {
        return res.status(500).json({ message: "Server error: " + err.message });
    }
    if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
};

// Manage activities (admin locked)

const createActivity = async (req, res) => {
    const activity = new Activity(req.body);
    try {
        await activity.save();
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (error) => error.message
            );
            return res.status(400).json({
                message: "Validation error on creation",
                errors: messages,
            });
        }
        res.status(500).json({ message: "Server error: " + err.message });
    }
    res.status(201).json({ message: "Activity created" });
};

const updateActivity = async (req, res) => {
    res.json({ message: "Update activity" });
    // try {
    //     const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //     if (!activity) {
    //         return res.status(404).json({ message: "Activity not found" });
    //     }
    //     res.json(activity);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
};

const deleteActivity = async (req, res) => {
    res.json({ message: "Delete activity" });
    // try {
    //     const activity = await Activity.findByIdAndDelete(req.params.id);
    //     if (!activity) {
    //         return res.status(404).json({ message: "Activity not found" });
    //     }
    //     res.json({ message: "Activity deleted" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};

module.exports = {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};
