import db from "../models";

let getAllBlogs = async (req, res) => {
    try {
        const blogs = await db.blog.findAll();
        res.status(200).json({
            message: "Get all blogs successfully",
            data: blogs,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting all blogs",
            error: error.message,
            errCode: 1
        });
    }
}

let getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await db.blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                errCode: 1
            });
        }
        res.status(200).json({
            message: "Get blog by id successfully",
            data: blog,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting blog by id",
            error: error.message,
            errCode: 1
        });
    }
}

let getBlogByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const blogs = await db.blog.findAll({ where: { categoryId: id } });
        if (blogs.length === 0) {
            return res.status(404).json({
                message: "Blog not found with this category id",
                errCode: 1
            });
        }
        res.status(200).json({
            message: "Get blog by category id successfully",
            data: blogs,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting blog by category id",
            error: error.message,
            errCode: 1
        });
    }
}

let getBlogByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "User id is required",
                errCode: 1
            });
        }
        const blogs = await db.blog.findAll({ where: { userId: id } });
        if (blogs.length === 0) {
            return res.status(404).json({
                message: "Blog not found with this user id",
                errCode: 1
            });
        }
        res.status(200).json({
            message: "Get blog by user id successfully",
            data: blogs,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting blog by user id",
            error: error.message,
            errCode: 1
        });
    }
}

let createBlog = async (req, res) => {
    try {
        const { title, content, contentHTML, userId, categoryId, image } = req.body;

        // Set default values
        let blogImage = image || "";
        let blogCategoryId = categoryId || 1;

        const blog = await db.blog.create({
            title,
            content,
            contentHTML,
            userId,
            categoryId: blogCategoryId,
            image: blogImage
        });

        return res.status(201).json({
            message: "Create blog successfully",
            data: blog,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating blog",
            error: error.message,
            errCode: 1
        });
    }
}

let deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        let blog = await db.blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                errCode: 1
            });
        }
        await db.comment.destroy({ where: { blogId: id } });
        await db.blog.destroy({ where: { id } });
        res.status(200).json({
            message: "Delete blog successfully",
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting blog",
            error: error.message,
            errCode: 1
        });
    }
}

let updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, contentHTML, userId, categoryId, image } = req.body;
        let blog = await db.blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                errCode: 1
            });
        }
        await db.blog.update(
            { title, content, contentHTML, userId, categoryId, image },
            { where: { id } }
        );

        res.status(200).json({
            message: "Update blog successfully",
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating blog",
            error: error.message,
            errCode: 1
        });
    }
}

export default {
    getAllBlogs,
    getBlogById,
    getBlogByUserId,
    createBlog,
    deleteBlog,
    updateBlog,
    getBlogByCategoryId
};

