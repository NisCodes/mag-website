import { db } from "../server.js"; // Importing the Admin SDK db exported from server.js

// 1. Fetch from Firestore newsletter collection
export const getNewsletter = async (req, res) => {
  try {
    // Admin SDK uses standard object chaining, not getDocs()
    const snapshot = await db.collection("newsletter").get();
    
    const newsletters = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "", // Explicitly mapped to fix the frontend Swiper bug
        link: data.link || "",
        image: data.image || ""
      };
    });

    res.status(200).json(newsletters);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching newsletters" });
  }
};

// 2. Push to Firestore newsletter collection
export const pushNewsletter = async (req, res) => {
  try {
    const { title, link, image } = req.body; 

    const newNewsletter = {
      title,
      link,
      image,
      date: new Date().toISOString()
    };

    // Admin SDK syntax for adding documents
    const docRef = await db.collection("newsletter").add(newNewsletter);
    res.status(201).json({ message: "Newsletter added successfully", id: docRef.id });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error adding newsletter" });
  }
};

// 3. Delete from Firestore newsletter collection
export const deleteNewsletter = async (req, res) => {
  try {
    // Admin SDK syntax for deleting documents
    await db.collection("newsletter").doc(req.params.id).delete();
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error deleting newsletter" });
  }
};
