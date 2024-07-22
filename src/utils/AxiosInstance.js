import axios from "axios";

const baseURL = 'https://render-1-75jn.onrender.com'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  }
});

// Function to check if the request URL is for login or signup
const isLoginOrSignupRequest = (url) => {
  return url.includes('/login') || url.includes('/signup') || url.includes('/register');;
};

// Add an interceptor for setting the Authorization header with the access token
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if it's not a login or signup request
    if (!isLoginOrSignupRequest(config.url)) {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;