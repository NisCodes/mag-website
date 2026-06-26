import { db } from "../server.js";

export const pushMagazine = async (req, res) => {
  const formData = req.body;

  let imageBase64 = null;
  if (req.file && req.file.buffer) {
    imageBase64 = req.file.buffer.toString("base64");
  }

  const newMagazinePost = {
    edition: formData.edition || "",
    link: formData.link || "",
    image: imageBase64,
    date: formData.date || new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  try {
    await db.collection("magazine").add(newMagazinePost);
    res.status(201).json({ message: "Magazine added successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error adding magazine" });
  }
};

export const getMagazine = async (req, res) => {
  try {
    const snapshot = await db.collection("magazine").get();
    
    const magazines = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      };
    });

    res.status(200).json(magazines);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching magazines" });
  }
};

export const deleteMagazine = async (req, res) => {
  try {
    const magazineId = req.params.id;
    const magazineRef = db.collection("magazine").doc(magazineId);
    const doc = await magazineRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Magazine not found" });
    }

    await magazineRef.delete();
    res.status(200).json({ message: "Magazine deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error deleting magazine" });
  }
};
