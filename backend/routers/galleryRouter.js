import express from "express";
import {getImage, pushImage} from "../controllers/galleryController.js"

const router = express.Router();

router.post("/post", pushImage);
router.get("/get", getImage);

export { router as galleryRouter };
