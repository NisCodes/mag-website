import { db } from "../server.js";

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

export const pushKarwaan = async (req, res) => {
  const formData = req.body;
  const imageBase64 = req.file ? req.file.buffer.toString("base64") : "";

  const newKarwaanPost = {
    year: formData.year || "",
    driveLink: formData.driveLink || "",
    image: imageBase64,
    date: formData.date || new Date().toISOString(),
  };

  try {
    await db.collection("karwaan").add(newKarwaanPost);
    res.status(201).json({ message: "Karwaan edition added successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error adding Karwaan edition" });
  }
};
