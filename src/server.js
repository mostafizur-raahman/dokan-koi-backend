import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";

async function connect() {
    try {
        await mongoose.connect(config.mongoURI);
        console.log("MongoDb connected");

        app.listen(config.port, () => {
            console.log(
                `${config.app_name} is listening on port ${config.port}`
            );
        });
    } catch (error) {
        console.log(error);
    }
}

connect();
