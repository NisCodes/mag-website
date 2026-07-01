import express from "express";
import { getKarwaan, pushKarwaan } from "../controllers/karwaanController.js";

const router = express.Router();

router.post("/post", pushKarwaan);
router.get("/get", getKarwaan);

export { router as karwaanRouter };
