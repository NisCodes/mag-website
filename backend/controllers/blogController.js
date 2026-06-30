import { db } from "../server.js";

// 1. User submits a blog (Defaults to Unapproved)
export const pushBlog = async (req, res) => {
  const formData = req.body;
  
  // Convert uploaded file buffer to Base64 string for Firestore storage
  const imageBase64 = req.file ? req.file.buffer.toString("base64") : null;

  const newBlogPost = {
    title: formData.title || "Untitled",
    content: formData.content || "",
    image: imageBase64,
    author: formData.author || "Anonymous",
    date: formData.date || new Date().toISOString(),
    rollno: formData.rollno || "",
    category: formData.category || "General", 
    approved: false, // Admin must manually approve this before it goes live!
  };

  try {
    await db.collection("blogs").add(newBlogPost);
    res.status(201).json({ message: "Blog post submitted for approval!" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error creating blog post" });
  }
};

// 2. Fetch ONLY Approved blogs for the public website
export const getBlogs = async (req, res) => {
  try {
    // Only pull documents where 'approved' is strictly true
    const snapshot = await db.collection("blogs").where("approved", "==", true).get();
    
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

// 3. Fetch ALL blogs (Approved & Unapproved) for Admin purposes
export const getallBlogs = async (req, res) => {
  try {
    const snapshot = await db.collection("blogs").get();
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching all blogs" });
  }
};

// 4. Admin Approves a Blog
export const approveBlog = async (req, res) => {
  try {
    // Flips the 'approved' boolean to true
    await db.collection("blogs").doc(req.params.id).update({ approved: true });
    res.status(200).json({ message: "Blog approved successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "An error occurred while approving the blog" });
  }
};

// 5. Admin Deletes a Blog
export const deleteBlog = async (req, res) => {
  try {
    await db.collection("blogs").doc(req.params.id).delete();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "An error occurred while deleting the blog" });
  }
};
