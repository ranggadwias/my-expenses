import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must contain at least 8 character(s)." });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return res
      .status(201)
      .json({ message: "User registered successfully.", userId: user._id });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
