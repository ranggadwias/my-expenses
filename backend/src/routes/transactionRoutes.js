import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createTransaction,
  getAllTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getAllTransactions);

export default router;
