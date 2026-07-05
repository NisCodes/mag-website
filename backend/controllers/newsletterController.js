import { db } from "../firebase.js"; // Importing your Firestore database instance
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// 1. Fetch from Firestore newsletter collection
export const getNewsletter = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "newsletter"));
    const newsletters = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() // This automatically includes title, link, and the image base64 string
    }));

    res.status(200).json(newsletters);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching newsletters" });
  }
};

// 2. Push to Firestore newsletter collection
export const pushNewsletter = async (req, res) => {
  try {
    const { title, link, image } = req.body; // Expects text fields + base64 image string

    const newNewsletter = {
      title,
      link,
      image,
      date: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "newsletter"), newNewsletter);
    res.status(201).json({ message: "Newsletter added successfully", id: docRef.id });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error adding newsletter" });
  }
};

// 3. Delete from Firestore newsletter collection
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletterDocRef = doc(db, "newsletter", req.params.id);
    await deleteDoc(newsletterDocRef);
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error deleting newsletter" });
  }
};
