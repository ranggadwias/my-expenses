import api from "../lib/axiosInstance";

const token = localStorage.getItem("token");

export const fetchTransactions = async () => {
  const response = await api.get("/api/transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.transactions;
};
