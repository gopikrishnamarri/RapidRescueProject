const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "No token provided", status: 403 });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }

        req.userId = decoded.id;
        next();
    });
};
