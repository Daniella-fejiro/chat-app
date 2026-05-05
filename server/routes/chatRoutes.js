import express from "express";
import {sendMessage} from "../controllers/sendMessage.js";
import { getMessages } from "../controllers/getMessages.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/send",authMiddleware, sendMessage);
router.get("/:userId", authMiddleware, getMessages);

export default router;