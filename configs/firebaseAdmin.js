import admin from "firebase-admin";

let db = null;

try {
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });

    db = admin.firestore();
    console.log("✅ Firebase Admin initialized");
  } else {
    console.warn("⚠️ Firebase env vars missing");
  }
} catch (err) {
  console.error("🔥 Firebase init error:", err.message);
}

export { db };
