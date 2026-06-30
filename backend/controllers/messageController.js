import { db } from "../server.js";

// Handle contact form submissions and save to Firestore
export const pushMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required input data
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  try {
    // Write directly to your Firestore 'messages' collection
    await db.collection("messages").add({
      name,
      email,
      subject: subject || "No Subject",
      message,
      createdAt: new Date().toISOString() // Keeps tracking timelines organized
    });

    res.status(201).json({ message: "Message sent and logged successfully" });
  } catch (err) {
    console.error(`Firestore error writing message: ${err}`);
    res.status(500).json({ error: "Error creating message" });
  }
};

// Fetch all contact messages for administrative review
export const getMessages = async (req, res) => {
  try {
    // Collect every message, ordering them with the newest on top
    const snapshot = await db.collection("messages").orderBy("createdAt", "desc").get();
    
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(messages);
  } catch (err) {
    console.error(`Firestore error fetching messages: ${err}`);
    res.status(500).json({ error: "Error fetching messages" });
  }
};
