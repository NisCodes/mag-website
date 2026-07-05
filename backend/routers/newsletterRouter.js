import express from "express";
import {
  getNewsletter,
  deleteNewsletter,
  pushNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

// Simple routes since Firestore handles everything as standard JSON fields
router.post("/post", pushNewsletter);
router.get("/get", getNewsletter);
router.delete("/delete/:id", deleteNewsletter);

export { router as newsletterRouter };
