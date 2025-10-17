export const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from "axios";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default api;
