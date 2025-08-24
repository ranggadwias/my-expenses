import api from "../lib/axiosInstance";

export const userRegister = async (data) => {
  const response = await api.post("/api/users/register", data);
  return response.data;
};

export const userLogin = async (data) => {
  const response = await api.post("/api/users/login", data);
  return response.data;
};

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
