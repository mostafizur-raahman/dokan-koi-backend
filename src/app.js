import express from "express";
import cors from "cors";
import globalError from "./app/middleware/globalError.js";
import notFound from "./app/middleware/notFound.js";
import router from "./app/routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// not found routes
app.use(notFound);

// globel error handlers
app.use(globalError);
export default app;
