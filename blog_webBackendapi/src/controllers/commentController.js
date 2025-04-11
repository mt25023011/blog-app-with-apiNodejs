import db from "../models";

// Get all comments for a blog
let getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await db.comment.findAll({
            where: { blogId },
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['id', 'username', 'avatar']
                },
                {
                    model: db.comment,
                    as: 'children',
                    include: [
                        {
                            model: db.user,
                            as: 'user',
                            attributes: ['id', 'username', 'avatar']
                        }
                    ]
                }
            ],
            where: { parentId: null } // Only get top-level comments
        });
        
        res.status(200).json({
            message: "Get comments successfully",
            data: comments,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting comments",
            error: error.message,
            errCode: 1
        });
    }
}

// Get a single comment by ID
let getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await db.comment.findByPk(id, {
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'profilePicture']
                }
            ]
        });
        
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                errCode: 1
            });
        }
        
        res.status(200).json({
            message: "Get comment successfully",
            data: comment,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting comment",
            error: error.message,
            errCode: 1
        });
    }
}

// Create a new comment
let createComment = async (req, res) => {
    try {
        const { content, blogId, userId, parentId } = req.body;
        
        // Validate required fields
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
        if (parentId) {
            const parentComment = await db.comment.findByPk(parentId);
            if (!parentComment) {
                return res.status(404).json({
                    message: "Parent comment not found",
                    errCode: 1
                });
            }
        }
        
        // Create the comment
        const comment = await db.comment.create({
            content,
            blogId,
            userId,
            parentId: parentId || null
        });
        
        // Fetch the created comment with user information
        const createdComment = await db.comment.findByPk(comment.id, {
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'profilePicture']
                }
            ]
        });
        
        res.status(201).json({
            message: "Create comment successfully",
            data: createdComment,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating comment",
            error: error.message,
            errCode: 1
        });
    }
}

// Update a comment
let updateComment = async (req, res) => {
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
        
        // Update the comment
        await db.comment.update(
            { content },
            { where: { id } }
        );
        
        // Fetch the updated comment
        const updatedComment = await db.comment.findByPk(id, {
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'profilePicture']
                }
            ]
        });
        
        res.status(200).json({
            message: "Update comment successfully",
            data: updatedComment,
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating comment",
            error: error.message,
            errCode: 1
        });
    }
}

// Delete a comment
let deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if comment exists
        const comment = await db.comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                errCode: 1
            });
        }
        
        // Delete the comment and its children
        await db.comment.destroy({
            where: {
                [db.Sequelize.Op.or]: [
                    { id },
                    { parentId: id }
                ]
            }
        });
        
        res.status(200).json({
            message: "Delete comment successfully",
            errCode: 0
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting comment",
            error: error.message,
            errCode: 1
        });
    }
}

export default {
    getCommentsByBlogId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}; 