import express from "express";
import { SendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/sendmessage", SendMessage);

export default router;