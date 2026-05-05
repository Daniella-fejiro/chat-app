import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: currentUser, receiver: userId },
        { sender: userId, receiver: currentUser }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};