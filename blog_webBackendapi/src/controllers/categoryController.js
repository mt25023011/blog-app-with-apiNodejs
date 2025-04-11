let db = require("../models");
let validateCategory = require("../services/validateCatogory");
import blogController from "./blogController";

let getAllCategories = async (req, res) => {
    try {
        const categories = await db.category.findAll();
        res.status(200).json({
            message: "Get all categories successfully",
            data: categories,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching categories",
            error: error.message,
            errCode: 1
        });
    }
}

let getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const isCategoryExist = await validateCategory.isCategoryExist(id);
        if (!isCategoryExist) {
            return res.status(404).json({
                message: "Category not found",
                errCode: 1
            });
        }
        const category = await db.category.findByPk(id);
        res.status(200).json({
            message: "Get category by id successfully",
            data: category,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching category",
            error: error.message,
            errCode: 1
        });
    }
}

let createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Validate category name
        const nameValidation = validateCategory.validateCategoryName(name);
        if (!nameValidation.isValid) {
            return res.status(400).json({
                message: nameValidation.message,
                errCode: nameValidation.errCode
            });
        }

        // Validate category name length
        const nameLengthValidation = validateCategory.validateCategoryNameLength(name);
        if (!nameLengthValidation.isValid) {
            return res.status(400).json({
                message: nameLengthValidation.message,
                errCode: nameLengthValidation.errCode
            });
        }

        // Validate description length
        const descriptionValidation = validateCategory.validateCategoryDescription(description);
        if (!descriptionValidation.isValid) {
            return res.status(400).json({
                message: descriptionValidation.message,
                errCode: descriptionValidation.errCode
            });
        }

        // Check for duplicate category name
        const duplicateValidation = await validateCategory.isDuplicateCategoryName(name);
        if (!duplicateValidation.isValid) {
            return res.status(400).json({
                message: duplicateValidation.message,
                errCode: duplicateValidation.errCode
            });
        }

        const nameCode = name.toLowerCase().trim().replace(/ /g, "-");
        const category = await db.category.create({ 
            name: name.trim(), 
            description: description ? description.trim() : null, 
            nameCode 
        });

        res.status(201).json({
            message: "Create category successfully",
            data: category,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating category",
            error: error.message,
            errCode: 1
        });
    }
}

let updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Validate category name
        const nameValidation = validateCategory.validateCategoryName(name);
        if (!nameValidation.isValid) {
            return res.status(400).json({
                message: nameValidation.message,
                errCode: nameValidation.errCode
            });
        }

        // Validate category name length
        const nameLengthValidation = validateCategory.validateCategoryNameLength(name);
        if (!nameLengthValidation.isValid) {
            return res.status(400).json({
                message: nameLengthValidation.message,
                errCode: nameLengthValidation.errCode
            });
        }

        // Validate description length
        const descriptionValidation = validateCategory.validateCategoryDescription(description);
        if (!descriptionValidation.isValid) {
            return res.status(400).json({
                message: descriptionValidation.message,
                errCode: descriptionValidation.errCode
            });
        }

        const isCategoryExist = await validateCategory.isCategoryExist(id);
        if (!isCategoryExist) {
            return res.status(404).json({
                message: "Category not found",
                errCode: 1
            });
        }

        // Check for duplicate category name excluding current category
        const duplicateValidation = await validateCategory.isDuplicateCategoryName(name, id);
        if (!duplicateValidation.isValid) {
            return res.status(400).json({
                message: duplicateValidation.message,
                errCode: duplicateValidation.errCode
            });
        }

        const nameCode = name.toLowerCase().trim().replace(/ /g, "-");
        await db.category.update(
            { 
                name: name.trim(), 
                description: description ? description.trim() : null, 
                nameCode 
            }, 
            { where: { id } }
        );

        const updatedCategory = await db.category.findByPk(id);
        res.status(200).json({
            message: "Update category successfully",
            data: updatedCategory,
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating category",
            error: error.message,
            errCode: 1
        });
    }
}

let deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const isCategoryExist = await validateCategory.isCategoryExist(id);
        if (!isCategoryExist) {
            return res.status(404).json({
                message: "Category not found",
                errCode: 1
            });
        }

        // Get category with associated blogs
        const categoryWithBlogs = await db.category.findByPk(id, {
            include: [{
                model: db.blog,
                as: 'blogs'
            }]
        });

        // Delete all associated comments and blogs first
        if (categoryWithBlogs.blogs && categoryWithBlogs.blogs.length > 0) {
            for (const blog of categoryWithBlogs.blogs) {
                // Delete all comments associated with this blog first
                await db.comment.destroy({ where: { blogId: blog.id } });
                // Then delete the blog
                await db.blog.destroy({ where: { id: blog.id } });
            }
        }

        // Then delete the category
        await db.category.destroy({ where: { id } });
        
        res.status(200).json({
            message: "Category and associated blogs deleted successfully",
            errCode: 0
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting category",
            error: error.message,
            errCode: 1
        });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
