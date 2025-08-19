import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import { buildFilterFromQuery } from "../utils/buildFilter.js";

export const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, note, date } = req.body;
    const userIdFromToken = req.userId;

    if (!userIdFromToken) {
      return res.status(401).json({ error: "Access denied. Please login." });
    }

    if (!type?.trim() || !category?.trim() || !note?.trim() || !date?.trim()) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const normalizedType = type.toLowerCase();
    if (normalizedType !== "expense" && normalizedType !== "income") {
      return res
        .status(400)
        .json({ error: "Type must be 'expense' or 'income'." });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ error: "Amount must be a positive number." });
    }

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const transaction = await Transaction.create({
      userId: userIdFromToken,
      type: normalizedType,
      category,
      amount: parsedAmount,
      note,
      date: formattedDate,
    });

    return res
      .status(201)
      .json({ message: "Transaction created successfully.", transaction });
  } catch (error) {
    console.error("Create error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const userIdFromToken = req.userId;

    if (!userIdFromToken) {
      return res.status(401).json({ error: "Access denied. Please login." });
    }

    const filter = buildFilterFromQuery(req.query, userIdFromToken);

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    if (transactions.length === 0) {
      return res.status(404).json({ error: "Transactions not found." });
    }

    return res
      .status(200)
      .json({ message: "Transactions retrieved successfully.", transactions });
  } catch (error) {
    console.error("Get Transactions error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.userId;

    if (!userIdFromToken) {
      return res.status(401).json({ error: "Access denied. Please login." });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (transaction.userId.toString() !== userIdFromToken.toString()) {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    return res
      .status(200)
      .json({ message: "Transaction retrieved successfully.", transaction });
  } catch (error) {
    console.error("Get Transactions by id error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { type, category, amount, note, date } = req.body;
    const { id } = req.params;
    const userIdFromToken = req.userId;

    if (!userIdFromToken) {
      return res.status(401).json({ error: "Access denied. Please login." });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (transaction.userId.toString() !== userIdFromToken.toString()) {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    if (!type && !category && !amount && !note && !date) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided for update." });
    }

    if (type) {
      const normalizedType = type.toLowerCase();
      if (normalizedType !== "expense" && normalizedType !== "income") {
        return res
          .status(400)
          .json({ error: "Type must be 'expense' or 'income'." });
      }
      transaction.type = normalizedType;
    }

    if (category) transaction.category = category;

    if (amount) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res
          .status(400)
          .json({ error: "Amount must be a positive number." });
      }
      transaction.amount = parsedAmount;
    }

    if (note) transaction.note = note;

    if (date) {
      const formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format." });
      }
      transaction.date = formattedDate;
    }

    const updatedTransaction = await transaction.save();

    return res.status(200).json({
      message: "Transaction updated successfully.",
      updatedTransaction,
    });
  } catch (error) {
    console.error("Update Transaction error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.userId;

    if (!userIdFromToken) {
      return res.status(401).json({ error: "Access denied. Please login." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid transaction ID." });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (transaction.userId.toString() !== userIdFromToken.toString()) {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      message: "Transaction deleted successfully.",
      transactionId: transaction._id,
    });
  } catch (error) {
    console.error("Delete Transaction error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
