import axios from "axios";

const baseClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient = {
  login: async (data) => {
    const res = await baseClient.post("/auth/login", data);
    return res.data;
  },
  register: async (data) => {
    const res = await baseClient.post("/auth/register", data);
    return res.data;
  },

  createOrder: async (data) => {
    const res = await baseClient.post("/orders", data);
    return res.data;
  },

  listProducts: async (data) => {
    const res = await baseClient.get("/products");
    return res.data;
  },
};
