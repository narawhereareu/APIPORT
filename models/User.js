// models/User.js
import { FieldValue } from "firebase-admin/firestore";

export class User {
  constructor({ FNAME, LNAME, EMAIL, TEL, PASS }) {
    this.FNAME = FNAME;
    this.LNAME = LNAME;
    this.EMAIL = EMAIL;
    this.TEL = TEL;
    this.PASS = PASS;
    this.createdAt = FieldValue.serverTimestamp(); // เพิ่ม timestamp
  }

  isValid() {
    return this.FNAME && this.LNAME && this.EMAIL && this.TEL && this.PASS;
  }

  toFirestore() {
    return {
      FNAME: this.FNAME,
      LNAME: this.LNAME,
      EMAIL: this.EMAIL,
      TEL: this.TEL,
      PASS: this.PASS,
      createdAt: this.createdAt // เพิ่มใน firestore
    };
  }
}
