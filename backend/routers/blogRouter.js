import express from "express";
import multer from "multer";
import { getAllBlogs, pushBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

// Configure multer for handling image uploads in-memory
const upload = multer({ storage: multer.memoryStorage() });

// API Endpoints linked to your controller functions
router.get("/", getAllBlogs);
router.post("/", upload.single("image"), pushBlog);
router.delete("/:id", deleteBlog);

export default router;
