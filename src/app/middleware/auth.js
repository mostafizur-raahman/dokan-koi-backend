// middleware/auth.js
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { UserServices } from "../../modules/user/user.service.js";

const auth = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Login required" });

    try {
        const decoded = jwt.verify(token, config.jwt_secret_key);

        const user = await UserServices.findById(decoded._id);

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }
        console.log("user ", user);
        console.log("decoded", decoded);

        req.user = user;

        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

export default auth;
