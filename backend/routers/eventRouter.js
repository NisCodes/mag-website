import express from "express";
import { getEvent, deleteEvent, pushEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/post", pushEvent);
router.get("/get", getEvent);
router.delete("/delete/:id", deleteEvent);

// Use default export for compatibility with non-braced imports
export default router;
