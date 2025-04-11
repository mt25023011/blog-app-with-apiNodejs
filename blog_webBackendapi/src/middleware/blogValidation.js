import db from "../models";

export const validateCreateBlog = async (req, res, next) => {
    try {
        const { title, content, contentHTML, userId, categoryId } = req.body;

        // Check required fields
        if (!title || !content || !contentHTML || !userId) {
            return res.status(400).json({
                message: "Title, content, contentHTML and userId are required",
                errCode: 1
            });
        }

        // Validate user exists
        const user = await db.user.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                errCode: 1
            });
        }

        // Validate category exists if provided
        if (categoryId) {
            const category = await db.category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({
                    message: "Category not found",
                    errCode: 1
                });
            }
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error in validation",
            error: error.message,
            errCode: 1
        });
    }
};

export const validateUpdateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, contentHTML, userId, categoryId } = req.body;

        // Check if blog exists
        const blog = await db.blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                errCode: 1
            });
        }

        // Validate required fields
        if (!title || !content || !contentHTML || !userId) {
            return res.status(400).json({
                message: "Title, content, contentHTML and userId are required",
                errCode: 1
            });
        }

        // Validate user exists
        const user = await db.user.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                errCode: 1
            });
        }

        // Validate category exists if provided
        if (categoryId) {
            const category = await db.category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({
                    message: "Category not found",
                    errCode: 1
                });
            }
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error in validation",
            error: error.message,
            errCode: 1
        });
    }
};

export const validateBlogExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await db.blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                errCode: 1
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error in validation",
            error: error.message,
            errCode: 1
        });
    }
}; 