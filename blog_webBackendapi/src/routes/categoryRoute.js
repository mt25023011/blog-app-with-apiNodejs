import express from "express";
import categoryController from "../controllers/categoryController";
import verifyToken from "../middleware/verifyToken";

let router = express.Router();

router.get("/",verifyToken,  categoryController.getAllCategories);
router.get("/:id",verifyToken, categoryController.getCategoryById);
router.post("/", verifyToken, categoryController.createCategory);
router.put("/:id", verifyToken, categoryController.updateCategory);
router.delete("/:id", verifyToken, categoryController.deleteCategory);
export default router;


