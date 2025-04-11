import express from "express";
import bcrypt from "bcrypt";
import db from "../models";

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Name validation function
const isValidName = (name) => {
    return name && name.length >= 2 && name.length <= 50 && /^[a-zA-Z\s'-]+$/.test(name);
};

// Password handling function
const handlePassword = async (password) => {
    if (!password) {
        return {
            isValid: false,
            message: "Password is missing",
            errCode: 1
        };
    }
    if (8 > password.length || password.length > 100) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long and less than 100 characters",
            errCode: 1
        };
    }
    // Improved special character regex
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain at least one uppercase letter, one number, and one special character",
            errCode: 1
        };
    }
    
    let hashPassword = await bcrypt.hash(password, 10);
    return {
        isValid: true,
        hashPassword
    };
};

// Email check function
const checkEmail = async (email) => {
    const user = await db.user.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        return {
            isValid: false,
            message: "Email already exists",
            errCode: 1
        };
    }
    return {
        isValid: true,
        message: "Email is valid",
        errCode: 0
    };
};

// Export all functions
export default {
    isValidEmail,
    isValidName,
    handlePassword,
    checkEmail
};

