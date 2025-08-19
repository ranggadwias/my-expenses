import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getAllTransactions);
router.get("/:id", verifyToken, getTransactionById);

export default router;
