import { db } from "../server.js";

// Handle image upload
export const pushImage = async (req, res) => {
  // Convert binary buffer to base64 string to store cleanly in Firestore
  let imageBase64 = null;
  if (req.file && req.file.buffer) {
    imageBase64 = req.file.buffer.toString("base64");
  }

  if (!imageBase64) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const newGalleryPost = {
      image_data: imageBase64,
      createdAt: new Date().toISOString()
    };

    await db.collection("gallery").add(newGalleryPost);
    res.status(201).json({ message: "Gallery post created successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error creating gallery post" });
  }
};

export const getImage = async (req, res) => {
  try {
    const snapshot = await db.collection("gallery").get();
    
    const images = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id, // Explicitly include document ID for frontend usage
        ...data
      };
    });

    res.status(200).json(images);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching gallery images" });
  }
};
