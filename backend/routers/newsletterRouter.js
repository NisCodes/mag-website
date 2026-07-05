import express from "express";
import {
  getNewsletter,
  deleteNewsletter,
  pushNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

router.post("/post", pushNewsletter);
router.get("/get", getNewsletter);
router.delete("/delete/:id", deleteNewsletter);

export { router as newsletterRouter };
