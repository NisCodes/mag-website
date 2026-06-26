import { db } from "../server.js";

export const pushBlog = async (req, res) => {
  const formData = req.body;

  let imageBase64 = null;
  if (req.file && req.file.buffer) {
    imageBase64 = req.file.buffer.toString("base64");
  }

  const newBlogPost = {
    title: formData.title || "",
    content: formData.content || "",
    image: imageBase64,
    date: formData.date || new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  try {
    await db.collection("blogs").add(newBlogPost);
    res.status(201).json({ message: "Blog entry created successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error creating blog entry" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const snapshot = await db.collection("blogs").get();
    
    const blogs = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      };
    });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching blog entries" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogRef = db.collection("blogs").doc(blogId);
    const doc = await blogRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Blog entry not found" });
    }

    await blogRef.delete();
    res.status(200).json({ message: "Blog entry deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error in deleting blog entry" });
  }
};
