import express from "express";
import {
  getKarwaan,
  deleteKarwaan,
  pushKarwaan,
} from "../controllers/karwaanController.js";

const router = express.Router();

router.post("/post", pushKarwaan);
router.get("/get", getKarwaan);
router.delete("/delete/:id", deleteKarwaan);

export { router as karwaanRouter };
