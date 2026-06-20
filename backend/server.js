import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
import multer from "multer"; 
import { blogRouter } from "./routers/blogRouter.js";
import { galleryRouter } from "./routers/galleryRouter.js";
import { messageRouter } from "./routers/messageRouter.js";
import { poetryRouter } from "./routers/poetryRouter.js";
import { eventRouter } from "./routers/eventRouter.js";
import { magazineRouter } from "./routers/magazineRouter.js";
const app = express();
const port = 4000;
env.config();

// const db = new pg.Client({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });
// db.connect();

import fs from "fs";
import url from "url";
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.CERTIFICATE).toString(),
    },
};

const db = new pg.Client(config);


db.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the online PostgreSQL database");
  }
});

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
