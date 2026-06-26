import express from "express";
import cors from "cors";
import env from "dotenv";
import multer from "multer"; 
import admin from "firebase-admin";

import  blogRouter  from "./routers/blogRouter.js";
import  galleryRouter  from "./routers/galleryRouter.js";
import  messageRouter  from "./routers/messageRouter.js";
import  poetryRouter  from "./routers/poetryRouter.js";
import  eventRouter  from "./routers/eventRouter.js";
import  magazineRouter  from "./routers/magazineRouter.js";

const app = express();
const port = 4000;
env.config();

// --- FIREBASE INITIALIZATION ---
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
} else {
  admin.initializeApp();
}

const db = admin.firestore();
console.log("Connected to the online Firebase Firestore database");
// -------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/blogs/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/gallery/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/poetry/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/events/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/magazine/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.use("/blogs", blogRouter);
app.use("/gallery", galleryRouter);
app.use("/messages", messageRouter);
app.use("/poetry", poetryRouter);
app.use("/events", eventRouter);
app.use("/magazine", magazineRouter);

export { db };

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
