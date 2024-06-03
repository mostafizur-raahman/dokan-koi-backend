// middleware/auth.js
import jwt from "jsonwebtoken";
import config from "../config/index.js";
const auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Login required" });

    try {
        const decoded = jwt.verify(token, config.jwt_secret_key);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

export default auth;
