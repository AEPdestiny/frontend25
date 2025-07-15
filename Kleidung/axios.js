import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  withCredentials: true // 🔥 Cookies bei JEDEM Request mitschicken
});

export default instance;
