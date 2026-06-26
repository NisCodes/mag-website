import { db } from "../server.js";

export const pushEvent = async (req, res) => {
  const formData = req.body;

  // Convert binary buffer to base64 string to store cleanly in Firestore
  let imageBase64 = null;
  if (req.file && req.file.buffer) {
    imageBase64 = req.file.buffer.toString("base64");
  }

  const newEventPost = {
    title: formData.title || "",
    content: formData.content || "",
    image: imageBase64, // Stored as plain text string
    date: formData.date || new Date().toISOString(),
    createdAt: new Date().toISOString() // Useful for sorting later
  };

  try {
    // Adds a new document with an auto-generated ID inside the 'events' collection
    await db.collection("events").add(newEventPost);
    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error creating event" });
  }
};

export const getEvent = async (req, res) => {
  try {
    // Fetch all documents from the 'events' collection
    const snapshot = await db.collection("events").get();
    
    const events = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id, // Include the document ID explicitly so the frontend can delete/edit it
        ...data
      };
    });

    res.status(200).json(events);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching events" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventRef = db.collection("events").doc(eventId);
    const doc = await eventRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Completely deletes the specific document using its ID
    await eventRef.delete();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error in deleting event" });
  }
};
