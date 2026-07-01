import { db } from "../server.js";

// Upload a new Karwaan event
export const pushKarwaan = async (req, res) => {
  const formData = req.body;
  
  // Convert image buffer to base64 string to match your Magazine setup
  const imageBase64 = req.file ? req.file.buffer.toString("base64") : null;

  const newKarwaanPost = {
    year: formData.year || "Karwaan Edition", // Equivalent to title/edition
    driveLink: formData.driveLink || "",      // Your requested Google Drive link
    image: imageBase64,
    date: formData.date || new Date().toISOString(),
  };

  try {
    // Add to Firestore collection
    await db.collection("karwaan").add(newKarwaanPost);
    res.status(201).json({ message: "Karwaan edition added successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error adding Karwaan edition" });
  }
};

// Fetch all Karwaan events
export const getKarwaan = async (req, res) => {
  try {
    const snapshot = await db.collection("karwaan").get();
    const editions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(editions);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching Karwaan editions" });
  }
};

// Delete a Karwaan event
export const deleteKarwaan = async (req, res) => {
  try {
    const docRef = db.collection("karwaan").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Karwaan edition not found" });
    }

    await docRef.delete();
    res.status(200).json({ message: "Karwaan edition deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error deleting Karwaan edition" });
  }
};
