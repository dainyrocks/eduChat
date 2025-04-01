import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL:
    "https://"+
    "6897-2409-40c4-f3-74bc-1914-b876-8104-b0af"
    +".ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
