import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const sender = req.user.id; 

    const newMessage = new Message({
      sender,
      receiver,
      message
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};