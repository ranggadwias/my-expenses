import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getAllTransactions);
router.get("/:id", verifyToken, getTransactionById);
router.put("/:id", verifyToken, updateTransaction);

export default router;
