module.exports = function (req, res, next) {
    console.log("Admin middleware called");
    if (!req.user || req.user.role !== "admin") {
        console.log("User is not an admin");
        return res.status(403).json({
            message: "Admin access required",
        });
    }

    next();
};
