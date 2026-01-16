import { db } from "../configs/firebaseAdmin.js";
import { Message } from "../models/Message.js";

export const SendMessage = async (req,res)=>{
    try{

        const {FULLNAME,EMAIL,Text} = req.body;
        const newMessage = new Message({FULLNAME,EMAIL,Text});
        if(!FULLNAME || !EMAIL || !Text){
            return res.status(400).json({
                err:"โปรดกรอกให้ครบครับพี่"
            });
        }
        const checkEmail = await db.collection("messages").where("EMAIL","==",EMAIL).get();
        if(!checkEmail.empty){
            return res.status(400).json({
                err:"This Email already have in DB, Try anothr, มีอีเมลนี้อยู่แล้วลองอีเมลใหม่ครับ"
            })
        }
         const saveMessage = await db.collection("messages").add({
        FULLNAME,
        EMAIL,
        Text,
        createdAt: new Date().toISOString(),
        });
        return res.status(201).json({
            message:"Success || ส่งข้อความเรียบร้อย",
            id: saveMessage.id,
        })
    }catch(err){
        console.error("Message error:", err);
        return res.status(500).json({
        err: "Server error",
        details: err.message,
        });
    }
}