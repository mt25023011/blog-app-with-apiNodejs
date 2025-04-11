import express from "express";
import userController from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";
import checkRole from "../middleware/checkRole";

let router = express.Router();

// Public routes
router.post("/", userController.CreateNewUser);

// Protected routes
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, checkRole(['R1', 'R2']), userController.updateUser);
router.delete("/:id", verifyToken, checkRole(['R1']), userController.deleteUser);

export default router;
