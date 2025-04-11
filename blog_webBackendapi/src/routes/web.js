import express from "express";
import testController from "../controllers/testController";
import userRoutes from "./userRoutes";
import authRoutes from "./auth";
import blogRoutes from "./blogRoutes";
import categoryRoutes from "./categoryRoute";
import commentRoutes from "./comment";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/test", testController.testController);
    router.use("/api/user", userRoutes);
    router.use("/api/auth", authRoutes);
    router.use("/api/blog", blogRoutes);
    router.use("/api/category", categoryRoutes);
    router.use("/api/comment", commentRoutes);
    return app.use("/", router);
}

export default initWebRoutes;
