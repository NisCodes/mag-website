import { db } from "../server.js";

export const pushPoem = async (req, res) => {
  const formData = req.body;

  let imageBase64 = null;
  if (req.file && req.file.buffer) {
    imageBase64 = req.file.buffer.toString("base64");
  }

  const newBlogPost = {
    title: formData.title || "",
    content: formData.content || "",
    image: imageBase64,
    author: formData.author || "",
    date: formData.date || new Date().toISOString(),
    rollno: formData.rollno || "",
    category: formData.category || "", 
    approved: false,
    createdAt: new Date().toISOString()
  };

  try {
    await db.collection("poetry").add(newBlogPost);
    res.status(201).json({ message: "Prose/Poetry post created successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error creating Prose/Poetry post" });
  }
};

// Fetches ONLY approved entries for the public frontend
export const getPoem = async (req, res) => {
  try {
    const snapshot = await db.collection("poetry").where("approved", "==", true).get();
    
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching prose/poetry" });
  }
};

// Fetches ALL entries (approved or pending) for the internal admin panel dashboard
export const getallPoem = async (req, res) => {
  try {
    const snapshot = await db.collection("poetry").get();
    
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching prose/poetry" });
  }
};

export const deletePoem = async (req, res) => {
  try {
    const poemId = req.params.id;
    const poemRef = db.collection("poetry").doc(poemId);
    const doc = await poemRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Prose/Poetry not found" });
    }

    await poemRef.delete();
    res.status(200).json({ message: "prose/poetry deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "An error occurred while deleting the prose/poetry" });
  }
};

export const approvePoem = async (req, res) => {
  try {
    const poemId = req.params.id;
    const poemRef = db.collection("poetry").doc(poemId);
    const doc = await poemRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Prose/poetry not found" });
    }

    // Update the flag inside the document
    await poemRef.update({ approved: true });

    res.status(200).json({ 
      message: "prose/poetry approved successfully", 
      blog: { id: doc.id, ...doc.data(), approved: true } 
    });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "An error occurred while approving the prose/poetry" });
  }
};
