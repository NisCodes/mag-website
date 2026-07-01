import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const snapshot = await db.collection("karwaan").get();
    const records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching Karwaan data:", err);
    res.status(500).json({ error: "Failed to grab Karwaan documentation" });
  }
});

export { router as karwaanRouter };
