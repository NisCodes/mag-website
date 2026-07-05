import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Ensure your firebaseConfig is correctly set up in server.js or imported here
// This assumes you have initialized your Firebase app elsewhere
const db = getFirestore(); 

export const getNewsletter = async (req, res) => {
  try {
    const newsletterCollection = collection(db, "newsletter");
    const snapshot = await getDocs(newsletterCollection);
    
    const newsletters = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(newsletters);
  } catch (err) {
    console.error(`Firestore error: ${err}`);
    res.status(500).json({ error: "Error fetching newsletters" });
  }
};

// Note: If you don't need to post/delete from the website, 
// you can leave push/delete empty for now.
