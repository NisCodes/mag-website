import express from "express";
import {getallBlogs, pushBlog, getBlogs, deleteBlog, approveBlog} from "../controllers/blogController.js";

const router = express.Router();

router.post("/post", pushBlog);
router.get("/get", getBlogs);
router.delete("/delete/:id", deleteBlog);
router.patch("/approve/:id", approveBlog);
router.get("/getall", getallBlogs);
export { router as blogRouter };
