import express from "express";
import {getEvent, deleteEvent, pushEvent} from "../controllers/eventController.js"

const router = express.Router();

router.post("/post", pushEvent);
router.get("/get", getEvent);
router.delete("/delete/:id", deleteEvent);

export { router as eventRouter };