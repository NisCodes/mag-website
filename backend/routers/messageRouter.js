import express from "express";
import { pushMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/post", pushMessage);
router.get("/get", getMessages);

export { router as messageRouter };
