import * as admin from "firebase-admin"
import { getApps } from 'firebase-admin/app'
const serviceAccount = require('./serviceAccountKey.json')

if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })

}

const adminDb = admin.firestore();
export { adminDb };