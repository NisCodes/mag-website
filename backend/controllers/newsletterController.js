import { db } from "../firebaseConfig.js";

export const getNewsletter = async (req, res) => {
  try {
    // Explicitly querying the 'newsletter' collection
    const snapshot = await db.collection("newsletter").get();
    
    // Log how many docs we found to your Vercel logs
    console.log(`Successfully queried 'newsletter'. Found ${snapshot.size} documents.`);

    const newsletters = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(newsletters);
  } catch (err) {
    console.error("Firestore error details:", err); // More detailed error log
    res.status(500).json({ error: "Error fetching newsletters" });
  }
};
