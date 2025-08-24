import { useEffect, useMemo, useState } from "react";
import { fetchTransactions } from "../services/transactionService";
import { fetchUser } from "../services/authService";

export const useDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const [transactionsData, userData] = await Promise.all([
          fetchTransactions(),
          fetchUser(),
        ]);

        setTransactions(transactionsData);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else if (transaction.type === "expense") {
        expense += transaction.amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  return { totalIncome, totalExpense, balance, user };
};
