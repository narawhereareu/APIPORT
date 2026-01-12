// controllers/authController.js
import { db } from "../configs/firebaseAdmin.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";


export const test = async (req, res) => {
  try {
    res.status(201).json({ message: "HEllo" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};
export const register = async (req, res) => {
  try {
    if (!db) {
      console.error("Firebase Admin NOT initialized - missing env or init failed");
      return res.status(500).json({ error: "Firebase not initialized" });
    }

    const { FNAME, LNAME, EMAIL, TEL, PASS } = req.body;
    const newUser = new User({ FNAME, LNAME, EMAIL, TEL, PASS });

    if (!newUser.isValid()) 
      return res.status(400).json({ error: "Please fill all fields" });

    const checkEmail = await db.collection("users").where("EMAIL", "==", EMAIL).get();
    if (!checkEmail.empty) 
      return res.status(400).json({ error: "Email already registered" });

    newUser.PASS = await bcrypt.hash(PASS, 10);
    const docRef = await db.collection("users").add(newUser.toFirestore());
    res.status(201).json({ 
      message: "User registered successfully", 
      EMAIL, 
      id: docRef.id, 
      createdAt: new Date().toISOString() 
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { EMAIL, PASS } = req.body;
    if (!EMAIL || !PASS) return res.status(400).json({ error: "Please fill all fields" });

    const snapshot = await db.collection("users").where("EMAIL", "==", EMAIL).get();
    if (snapshot.empty) return res.status(404).json({ error: "User not found" });

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const match = await bcrypt.compare(PASS, userData.PASS);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Login successful", EMAIL: userData.EMAIL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
