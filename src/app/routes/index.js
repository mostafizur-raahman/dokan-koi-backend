import { Router } from "express";
import { UserRoutes } from "../../modules/user/user.route.js";
import { RoleRoutes } from "../../modules/Role/role.route.js";

const router = Router();

router.use("/users", UserRoutes);
router.use("/roles", RoleRoutes);

export default router;
