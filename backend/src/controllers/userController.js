import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "Login successfully", token, userId: user._id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userIdFromToken = req.userId;

    const user = await User.findById(userIdFromToken).select("-password").lean();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get User error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const userIdFromToken = req.userId;

    if (id !== userIdFromToken) {
      return res.status(403).json({
        error: "Unauthorized access. You can only update your own profile.",
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must contain at least 8 character(s)." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "User edited successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.userId;

    if (id !== userIdFromToken) {
      return res.status(403).json({
        error: "Unauthorized access. You can only delete your own profile.",
      });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: user._id });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
