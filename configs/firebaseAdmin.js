import admin from "firebase-admin";

let db = null;

try {
  // Support a single JSON env var (easy for Render) or individual parts.
  let serviceAccount = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Expecting a JSON string. Render and other hosts allow a single env var.
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.warn("FIREBASE_SERVICE_ACCOUNT is not valid JSON; attempting to recover");
      // If the string was stored with newlines escaped incorrectly, try to replace literal newlines
      const cleaned = process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, "\n");
      serviceAccount = JSON.parse(cleaned);
    }
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  }

  if (serviceAccount) {
    // Ensure key property name matches what the SDK expects
    if (serviceAccount.privateKey && !serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.privateKey;
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    db = admin.firestore();
    console.log("✅ Firebase Admin initialized");
  } else {
    console.warn("⚠️ Firebase env vars missing. Set FIREBASE_SERVICE_ACCOUNT or FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY");
  }
} catch (err) {
  console.error("🔥 Firebase init error:", err && err.message ? err.message : err);
}

export { db };
