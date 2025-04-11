import db from "../models";

// Validate comment exists
export const validateCommentExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await db.comment.findByPk(id);
        
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                errCode: 1
            });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error validating comment",
            error: error.message,
            errCode: 1
        });
    }
};

// Validate create comment request
export const validateCreateComment = async (req, res, next) => {
    try {
        const { content, blogId, userId } = req.body;
        
        // Check required fields
        if (!content || !blogId || !userId) {
            return res.status(400).json({
                message: "Content, blogId, and userId are required",
                errCode: 1
            });
        }
        
        // Check if blog exists
        const blog = await db.blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                errCode: 1
            });
        }
        
        // Check if user exists
        const user = await db.user.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                errCode: 1
            });
        }
        
        // If parentId is provided, check if parent comment exists
        if (req.body.parentId) {
            const parentComment = await db.comment.findByPk(req.body.parentId);
            if (!parentComment) {
                return res.status(404).json({
                    message: "Parent comment not found",
                    errCode: 1
                });
            }
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error validating comment creation",
            error: error.message,
            errCode: 1
        });
    }
};

// Validate update comment request
export const validateUpdateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        
        // Check if comment exists
        const comment = await db.comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                errCode: 1
            });
        }
        
        // Check if content is provided
        if (!content) {
            return res.status(400).json({
                message: "Content is required",
                errCode: 1
            });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error validating comment update",
            error: error.message,
            errCode: 1
        });
    }
}; 