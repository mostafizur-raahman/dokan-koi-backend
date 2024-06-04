import express from "express";
import { UserController } from "./user.controller.js";
import auth from "../../app/middleware/auth.js";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.post("/login", UserController.login);

router.get("/", auth, UserController.getAllUser);
router.get("/single", UserController.getSingleUser);
router.delete("/delete", UserController.deleteUser);

export const UserRoutes = router;
