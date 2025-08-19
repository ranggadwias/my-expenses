import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", verifyToken, createTransaction);

export default router;
