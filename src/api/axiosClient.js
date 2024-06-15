import axios from "axios";
import queryString from "query-string";
//default config for http requests

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? // ? "http://localhost:4000/v1"
        process.env.REACT_APP_API_URL
      : process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // const token = localStorage.getItem("token");
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
