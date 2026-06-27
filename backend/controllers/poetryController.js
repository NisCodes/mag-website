import { db } from "../server.js"; // Assumes db is your admin.firestore() instance

export const pushPoem = async (req, res) => {
  const formData = req.body;

  // Build the data object cleanly matching your Firestore schema
  const newPoem = {
    title: formData.title || "",
    content: formData.content || "",
    author: formData.author || "",
    rollno: formData.rollno || "",
    category: formData.category || "English",
    date: formData.date || new Date().toISOString().slice(0, 10),
    approved: false, // Remains false initially for your editorial queue moderation!
  };

  try {
    // Write directly to your Firestore collection ('poetry')
    const docRef = await db.collection("poetry").add(newPoem);
    res.status(201).json({ 
      message: "Prose/Poetry post created successfully", 
      id: docRef.id 
    });
  } catch (err) {
    console.error(`Firestore error writing poem: ${err}`);
    res.status(500).json({ error: "Error creating Prose/Poetry post" });
  }
};

export const getPoem = async (req, res) => {
  try {
    // Only pull items approved by the admin group
    const snapshot = await db.collection("poetry").where("approved", "==", true).get();
    
    const poems = [];
    snapshot.forEach((doc) => {
      poems.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(poems);
  } catch (err) {
    console.error(`Firestore error fetching approved poems: ${err}`);
    res.status(500).json({ error: "Error fetching approved prose/poetry" });
  }
};

export const getallPoem = async (req, res) => {
  try {
    // Pull every entry for admin overview/dashboard display
    const snapshot = await db.collection("poetry").get();
    
    const poems = [];
    snapshot.forEach((doc) => {
      poems.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(poems);
  } catch (err) {
    console.error(`Firestore error fetching all poems: ${err}`);
    res.status(500).json({ error: "Error fetching all prose/poetry" });
  }
};

export const deletePoem = async (req, res) => {
  try {
    const docRef = db.collection("poetry").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Prose/Poetry not found" });
    }

    await docRef.delete();
    res.status(200).json({ message: "prose/poetry deleted successfully" });
  } catch (err) {
    console.error(`Firestore error deleting poem: ${err}`);
    res.status(500).json({ error: "An error occurred while deleting the prose/poetry" });
  }
};

export const approvePoem = async (req, res) => {
  try {
    const docRef = db.collection("poetry").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Prose/poetry not found" });
    }

    // Set approval status to true
    await docRef.update({ approved: true });
    
    res.status(200).json({ 
      message: "prose/poetry approved successfully", 
      id: req.params.id 
    });
  } catch (err) {
    console.error(`Firestore error approving poem: ${err}`);
    res.status(500).json({ error: "An error occurred while approving the prose/poetry" });
  }
};
