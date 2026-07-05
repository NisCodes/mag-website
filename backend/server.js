import express from "express";
import cors from "cors";
import env from "dotenv";
import multer from "multer"; 
import admin from "firebase-admin"; // 1. Import Firebase Admin instead of pg
// Import all your routers
import { blogRouter } from "./routers/blogRouter.js";
import { galleryRouter } from "./routers/galleryRouter.js";
import { messageRouter } from "./routers/messageRouter.js";
import { poetryRouter } from "./routers/poetryRouter.js";
import { eventRouter } from "./routers/eventRouter.js";
import { magazineRouter } from "./routers/magazineRouter.js";
import { newsletterRouter } from "./routes/newsletterRouter.js";


const app = express();
const port = 4000;
env.config();

// 3. Initialize Firebase Firestore Admin SDK
// Make sure your .env has the path to your service account credentials file
import fs from "fs";
const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT).toString());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); // This is the real Firestore instance!

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Multer middleware passes raw image buffers to your controllers
app.post("/blogs/post", upload.single("image"), (req, res, next) => { next(); });
app.post("/gallery/post", upload.single("image"), (req, res, next) => { next(); });
app.post("/poetry/post", upload.single("image"), (req, res, next) => { next(); });
app.post("/events/post", upload.single("image"), (req, res, next) => { next(); });
app.post("/magazine/post", upload.single("image"), (req, res, next) => { next(); });


// 4. Mount all routers (including your new Karwaan route)
app.use("/blogs", blogRouter);
app.use("/gallery", galleryRouter);
app.use("/messages", messageRouter);
app.use("/poetry", poetryRouter);
app.use("/events", eventRouter);
app.use("/magazine", magazineRouter);
app.use("/newsletter", newsletterRouter);

export { db };

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
