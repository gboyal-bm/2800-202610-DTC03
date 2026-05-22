/**
 * @fileoverview Controller for handling activity requests
 * @module controllers/activity_request
 *
 * @description Defines controller functions for managing activity requests.
 * @exports createRequest
 * @exports getRequests
 * @exports updateRequestStatus
 *
 * @author Gurkaren Boyle
 */

const ActivityRequest = require("../models/activity_requests");
const Activity = require("../models/activity");

/**
 * @function createRequest
 *
 * @description Creates a new activity request with the provided details and the ID of the requesting user.
 */
exports.createRequest = async (req, res) => {
    try {
        const request = await ActivityRequest.create({
            ...req.body,
            requestedBy: req.user.id,
        });

        res.status(201).json(request);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

/**
 * @function getRequests
 *
 * @description Retrieves all activity requests, including the username and email of the requesting user, sorted by creation date in descending order.
 */
exports.getRequests = async (_req, res) => {
    try {
        const requests = await ActivityRequest.find()
            .populate("requestedBy", "username email")
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * @function updateRequestStatus
 *
 * @description Updates the status of an activity request. If the request is approved, a new activity is created with the details from the request.
 */
exports.updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const request = await ActivityRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found",
            });
        }

        request.status = status;
        await request.save();

        if (status === "approved") {
            await Activity.create({
                name: request.name,
                location: request.location,
                category: request.category,
                description: request.description,
            });
        }

        res.json(request);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
