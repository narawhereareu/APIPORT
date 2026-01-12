// configs/firebaseAdmin.js
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โหลด serviceAccountKey.json
const serviceAccount = await import(path.join(__dirname, "serviceAccountKey.json"), {
  assert: { type: "json" }
});

// initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.default)
});

export const db = admin.firestore();
