import { useEffect, useMemo, useState } from "react";
import { fetchTransactions } from "../services/transactionService";
import { fetchUser } from "../services/authService";

export const useDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const transactionsData = await fetchTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }

      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
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

  const expensePerCategory = useMemo(() => {
    const categoryMap = {};
    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        categoryMap[transaction.category] =
          (categoryMap[transaction.category] || 0) + transaction.amount;
      }
    });
    return Object.entries(categoryMap).map(([category, total]) => ({
      category,
      total,
    }));
  }, [transactions]);

  const monthlyExpenses = useMemo(() => {
    const monthMap = {};
    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    monthLabels.forEach((m) => (monthMap[m] = 0));

    transactions.forEach(({ type, amount, date }) => {
      if (type === "expense") {
        const d = new Date(date);
        const month = monthLabels[d.getMonth()];
        monthMap[month] = (monthMap[month] || 0) + amount;
      }
    });

    return monthLabels.map((month) => ({
      month,
      total: monthMap[month],
    }));
  }, [transactions]);

  const isMonthlyEmpty = useMemo(() => {
    return monthlyExpenses.every((item) => item.total === 0);
  }, [monthlyExpenses]);

  return {
    totalIncome,
    totalExpense,
    balance,
    user,
    expensePerCategory,
    monthlyExpenses,
    isMonthlyEmpty
  };
};
