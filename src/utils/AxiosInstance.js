import axios from "axios";
import { toast } from "react-toastify";

// const baseURL = 'https://render-1-75jn.onrender.com'
const baseURL = "https://tooki.repsoft.in/"

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

// Add an interceptor to handle responses and check for invalid token
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // If the response is successful, return it
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, redirect to the login page
      if (typeof window !== "undefined") {
        // localStorage.clear();
        window.location.href = "/login";
        localStorage.clear()
        toast("Session timed out, Please login agian")
        
      }
    }
    return Promise.reject(error); // Return any other errors
  }
);


export default axiosInstance;