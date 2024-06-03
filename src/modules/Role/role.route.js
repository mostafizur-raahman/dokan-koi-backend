import express from "express";
import { RoleController } from "./role.controller.js";

const router = express.Router();

router.post("/create-role", RoleController.createRole);
router.get("/", RoleController.getAllRole);

export const RoleRoutes = router;
