import express from "express";
import {
  getMagazine,
  deleteMagazine,
  pushMagazine,
} from "../controllers/magazineController.js";

const router = express.Router();

router.post("/post", pushMagazine);
router.get("/get", getMagazine);
router.delete("/delete/:id", deleteMagazine);

export { router as magazineRouter };
