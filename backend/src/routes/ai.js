const express = require("express");
const router = express.Router();

const { sendMessage } = require("../services/gemini")

router.post("/generateMessage", async (req, res) => {
    try {
        const { info } = req.body;
        const result = await sendMessage(info);

        res.json({
            response: result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate response",
        });
    }
});

module.exports = router;
