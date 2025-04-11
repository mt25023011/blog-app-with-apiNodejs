import express from "express";

let testController = (req, res) => {
    res.send("test");
}

export default {
    testController: testController
};
