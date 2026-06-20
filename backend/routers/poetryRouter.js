import express from "express";
import {approvePoem, getallPoem, getPoem, deletePoem, pushPoem} from "../controllers/poetryController.js"

const router = express.Router();

router.post("/post", pushPoem);
router.get("/get", getPoem);
router.delete("/delete/:id", deletePoem);
router.get("/getall", getallPoem);
router.patch("/approve/:id", approvePoem);
export { router as poetryRouter };