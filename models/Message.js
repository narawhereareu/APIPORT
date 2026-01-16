import { FieldValue } from "firebase-admin/firestore";

export class Message {
    constructor({
        FULLNAME, EMAIL ,Text
    }){
        this.FULLNAME = FULLNAME,
        this.EMAIL = EMAIL,
        this.Text = Text,
        this.createdAt = FieldValue.serverTimestamp()
    }

    isValid() {
        return this.FULLNAME && this.EMAIL && this.Text;
    }

    toFirestore() {
        return {
            FULLNAME: this.FULLNAME,
            EMAIL: this.EMAIL,
            Text: this.Text,
            createdAt: this.createdAt
        };
    }
}