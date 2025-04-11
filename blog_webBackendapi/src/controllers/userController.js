import db from "../models";
import express from "express";
import validateUser from "../services/validateUser";
// Email validation function


let getAllUsers = async (req, res) => {
    try {
        const users = await db.user.findAll();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            errCode: 1
        });
    }
}
let getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.user.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                errCode: 1
            });
        }
        res.status(200).json({
            message: "User fetched successfully",
            data: user,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            errCode: 1
        });
    }
}
let CreateNewUser = async (req, res) => {
    try {
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({
                message: "Request body is missing",
                errCode: 1
            });
        }
        
        // Handle both JSON and FormData formats
        let email, password, firstName, lastName, role, profilePicture;
        
        // Check if data is coming from FormData
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            email = req.body.email;
            password = req.body.password;
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            role = req.body.role || 'R2'; // Default role if not provided
            profilePicture = req.body.profilePicture;
        } else {
            // Handle JSON format
            ({ email, password, firstName, lastName, role = 'R2', profilePicture } = req.body);
        }
        
        // Validate required fields
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                message: "Missing required fields",
                errCode: 1
            });
        }
        
        // Validate email format
        if (!validateUser.isValidEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                errCode: 1
            });
        }
        
        // Validate names
        if (!validateUser.isValidName(firstName) || !validateUser.isValidName(lastName)) {
            return res.status(400).json({
                message: "First name and last name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
                errCode: 1
            });
        }
        
        const passwordResult = await validateUser.handlePassword(password);
        if (!passwordResult.isValid) {
            return res.status(400).json({
                message: passwordResult.message,
                errCode: passwordResult.errCode
            });
        }
        
        const emailResult = await validateUser.checkEmail(email);
        if (!emailResult.isValid) {
            return res.status(400).json({
                message: emailResult.message,
                errCode: emailResult.errCode
            });
        }
        
        const user = await db.user.create({
            email,
            password: passwordResult.hashPassword,
            firstName,
            lastName,
            role,
            profilePicture
        });
        
        res.status(200).json({
            message: "User created successfully",
            data: user,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            errCode: 1
        });
    }
}
let updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, firstName, lastName, role, profilePicture } = req.body;

        const user = await db.user.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                errCode: 1
            });
        }
        
        // Create update object with only provided fields
        const updateData = {};
        
        // Only update password if provided
        if (password) {
            const passwordResult = await validateUser.handlePassword(password);
            if (!passwordResult.isValid) {
                return res.status(400).json({
                    message: passwordResult.message,
                    errCode: passwordResult.errCode
                });
            }
            updateData.password = passwordResult.hashPassword;
        }
        
        // Only update other fields if they are provided
        if (firstName !== undefined) {
            if (!validateUser.isValidName(firstName)) {
                return res.status(400).json({
                    message: "First name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
                    errCode: 1
                });
            }
            updateData.firstName = firstName;
        }
        
        if (lastName !== undefined) {
            if (!validateUser.isValidName(lastName)) {
                return res.status(400).json({
                    message: "Last name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
                    errCode: 1
                });
            }
            updateData.lastName = lastName;
        }
        
        if (role !== undefined) {
            updateData.role = role;
        }
        
        if (profilePicture !== undefined) {
            updateData.profilePicture = profilePicture;
        }
        
        // Only update if there are changes
        if (Object.keys(updateData).length > 0) {
            const updatedUser = await user.update(updateData);
            res.status(200).json({
                message: "User updated successfully",
                data: updatedUser,
                errCode: 0
            });
        } else {
            res.status(400).json({
                message: "No valid fields to update",
                errCode: 1
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            errCode: 1
        });
    }
}

let deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.user.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                errCode: 1
            });
        }

        // Get all blogs by the user
        const userBlogs = await db.blog.findAll({
            where: { userId: id }
        });

        // Delete comments on each blog and child comments
        for (const blog of userBlogs) {
            await db.comment.destroy({
                where: {
                    [db.Sequelize.Op.or]: [
                        { blogId: blog.id },
                        { parentId: { [db.Sequelize.Op.ne]: null } }
                    ]
                }
            });
        }

        // Delete all comments made by the user
        await db.comment.destroy({
            where: { userId: id }
        });

        // Delete all blogs by the user
        await db.blog.destroy({
            where: { userId: id }
        });

        // Finally delete the user
        await user.destroy();
        
        res.status(200).json({
            message: "User and all associated content deleted successfully",
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
            errCode: 1
        });
    }
}

export default {
    getAllUsers,
    CreateNewUser,
    updateUser,
    deleteUser,
    getUserById
};
