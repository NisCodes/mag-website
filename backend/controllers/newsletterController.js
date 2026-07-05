import { db } from '../firebaseConfig.js';

export const getNewsletter = async (req, res) => {
  try {
    const snapshot = await db.collection('newsletter').get();
    const newsletters = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(newsletters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Firestore" });
  }
};
