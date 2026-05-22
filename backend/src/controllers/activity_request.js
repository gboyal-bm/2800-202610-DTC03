const ActivityRequest = require("../models/activity_requests");
const Activity = require("../models/activity");

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
