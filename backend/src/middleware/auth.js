/**
 * @fileoverview User authentication/authorization middleware
 * @module middleware/auth
 * 
 * @description Defines middleware for user authentication and authorization.
 * @exports authenticate
 */


/**
 * @function authenticate
 * @description Authenticates user before allowing access to protected routes.
 * 
 * @param {Object} req
 * @param {Object} res 
 * @param {Function} next 
 */
const authenticate = (req, res, next) => {
    if (!(req.session?.user)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = req.session.user;
    next();
};

module.exports = {
    authenticate
};
