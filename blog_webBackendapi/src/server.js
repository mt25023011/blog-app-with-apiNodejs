import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();
let app = express();

// Configure multer for handling FormData
const upload = multer();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',  // Vite default
  'http://localhost:3000',  // React default
  'http://localhost:8080',  // Your backend
  process.env.FRONTEND_URL || '' // Allow environment variable for frontend URL
].filter(Boolean); // Remove empty strings

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

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