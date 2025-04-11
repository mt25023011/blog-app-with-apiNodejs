import express from "express";
import blogController from "../controllers/blogController";
import verifyToken from "../middleware/verifyToken";
let router = express.Router();

router.get("/", verifyToken, blogController.getAllBlogs);
router.get("/:id", verifyToken, blogController.getBlogById);
router.get("/category/:id", verifyToken, blogController.getBlogByCategoryId);
router.get("/user/:id", verifyToken, blogController.getBlogByUserId);
router.post("/", verifyToken, blogController.createBlog);
router.put("/:id", verifyToken, blogController.updateBlog);
router.delete("/:id", verifyToken, blogController.deleteBlog);
export default router;
