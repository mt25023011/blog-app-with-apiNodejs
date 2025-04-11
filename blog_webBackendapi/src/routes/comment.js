import express from "express";
import commentController from "../controllers/commentController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Public routes
router.get("/blog/:blogId",verifyToken, commentController.getCommentsByBlogId);
router.get("/:id",verifyToken, commentController.getCommentById);

// Protected routes
router.post("/", verifyToken, commentController.createComment);
router.put("/:id", verifyToken, commentController.updateComment);
router.delete("/:id", verifyToken, commentController.deleteComment);

export default router; 