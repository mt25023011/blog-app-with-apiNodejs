import express from "express";
import bcrypt from "bcrypt";
import db from "../models";

let isEmailExist = async (email) => {
    const user = await db.user.findOne({
        where: {
            email: email
        }
    });
    return user ? true : false;
}

let isEmailValid = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid;
}

let isPasswordValid = async (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z]).{8,100}$/;
    const isValid = passwordRegex.test(password);
    return isValid;
}

let hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

let comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

export default {
    isEmailExist,
    isEmailValid,
    isPasswordValid,
    hashPassword,
    comparePassword
}
















