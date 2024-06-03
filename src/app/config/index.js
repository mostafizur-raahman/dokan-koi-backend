import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    bcrypt_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    default_pass: process.env.DEFAULT_PASS,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    app_name: process.env.APP_NAME,
};
