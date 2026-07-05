import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const app = initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore(app);
