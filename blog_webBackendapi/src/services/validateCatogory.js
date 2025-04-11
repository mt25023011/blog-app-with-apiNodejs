let db = require("../models");

let isCategoryExist = async (id) => {
    const category = await db.category.findOne({
        where: {
            id: id
        }
    });
    if (!category) {
        return false;
    }
    return true;
}

let validateCategoryName = (name) => {
    if (!name || name.trim().length === 0) {
        return {
            isValid: false,
            message: "Category name is required",
            errCode: 1
        };
    }
    return {
        isValid: true
    };
}

let validateCategoryNameLength = (name) => {
    if (name.length > 100) {
        return {
            isValid: false,
            message: "Category name must be less than 100 characters",
            errCode: 1
        };
    }
    return {
        isValid: true
    };
}

let validateCategoryDescription = (description) => {
    if (description && description.length > 500) {
        return {
            isValid: false,
            message: "Description must be less than 500 characters",
            errCode: 1
        };
    }
    return {
        isValid: true
    };
}

let isDuplicateCategoryName = async (name, excludeId = null) => {
    const whereClause = { name: name.trim() };
    if (excludeId) {
        whereClause.id = { [db.Sequelize.Op.ne]: excludeId };
    }

    const existingCategory = await db.category.findOne({
        where: whereClause
    });

    if (existingCategory) {
        return {
            isValid: false,
            message: "Category with this name already exists",
            errCode: 1
        };
    }
    return {
        isValid: true
    };
}

module.exports = {
    isCategoryExist,
    validateCategoryName,
    validateCategoryNameLength,
    validateCategoryDescription,
    isDuplicateCategoryName
}
