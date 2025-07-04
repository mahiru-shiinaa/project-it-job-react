// services/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://server-it-job.onrender.com/api/v1/", // 👈 thay đổi tùy môi trường
  withCredentials: true,           // 👈 để gửi/nhận cookie HttpOnly
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptors (tùy chọn): thêm token hoặc xử lý lỗi chung
axiosClient.interceptors.request.use(
  (config) => {
    // Nếu dùng localStorage token thì thêm ở đây (cách 1 - header)
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data, // chỉ lấy `data` cho gọn
  (error) => {
  //  console.error("API error:", error.response);
    return Promise.reject(error);
  }
);

export default axiosClient;
