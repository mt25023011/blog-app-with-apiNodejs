import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
let app = express();

// Configure multer for handling FormData
const upload = multer();

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add multer middleware to handle FormData
app.use(upload.none());

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
});