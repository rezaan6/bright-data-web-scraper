import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY ?? "";

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDb = admin.firestore();
export { adminDb };
