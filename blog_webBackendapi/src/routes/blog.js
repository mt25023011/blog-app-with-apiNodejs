import express from "express";
import blogController from "../controllers/blogController";
import { validateCreateBlog, validateUpdateBlog, validateBlogExists } from "../middleware/blogValidation";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// Public routes
router.get("/", blogController.getAllBlogs);
router.get("/:id", validateBlogExists, blogController.getBlogById);
router.get("/category/:id", blogController.getBlogByCategoryId);
router.get("/user/:id", blogController.getBlogByUserId);

// Protected routes
router.post("/", verifyToken, validateCreateBlog, blogController.createBlog);
router.put("/:id", verifyToken, validateUpdateBlog, blogController.updateBlog);
router.delete("/:id", verifyToken, validateBlogExists, blogController.deleteBlog);

export default router; 