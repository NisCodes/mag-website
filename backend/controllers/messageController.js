import { db } from "../server.js";

// Handle message submission
export const pushMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input data
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  try {
    const newMessage = {
      name,
      email,
      subject: subject || "",
      message,
      createdAt: new Date().toISOString()
    };

    // Insert the message into the Firestore collection
    await db.collection("messages").add(newMessage);
    res.status(201).json({ message: "Message created successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error creating message" });
  }
};

// Fetch all messages
export const getMessages = async (req, res) => {
  try {
    const snapshot = await db.collection("messages").get();
    
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(messages);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching messages" });
  }
};
