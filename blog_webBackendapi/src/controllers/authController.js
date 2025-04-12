import express from "express";
import db from "../models";
import validateAuth from "../services/validateAuth";
import jwt from "jsonwebtoken";
let login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.user.findOne({
        where: { email }
    });
    if (!user) {
        return res.status(401).json({
             message: "Invalid email or password",
             errCode: 1
            });
    }
    const isPasswordValid = await validateAuth.comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
             message: "Invalid email or password",
             errCode: 1
            });
    }
    let secretKey = process.env.JWT_SECRET;
    console.log(secretKey)
    const token = jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
    res.status(200).json({
        message: "Login successful",
        data: user,
        token: token,
        errCode: 0
    });
}

let register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmailExist = await validateAuth.isEmailExist(email);
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists", errCode: 1 });
        }
        const isEmailValid = await validateAuth.isEmailValid(email);
        if (!isEmailValid) {
            return res.status(400).json({ message: "Invalid email format", errCode: 1 });
        }
        const isPasswordValid = await validateAuth.isPasswordValid(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password format", errCode: 1 });
        }
        const hashPassword = await validateAuth.hashPassword(password);
        const role = "R2";
        
        console.log("Attempting to create user with email:", email);
        const user = await db.user.create({ 
            email, 
            password: hashPassword, 
            role 
        });
        
        res.status(200).json({
            message: "User created successfully",
            errCode: 0
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ 
            message: "Error creating user", 
            error: error.message,
            errCode: 2
        });
    }
}

export default {
    login,
    register
}
