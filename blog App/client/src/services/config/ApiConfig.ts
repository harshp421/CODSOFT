import axios from "axios";

// Create an AxiosInstance of Axios with default configuration
export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Set the base URL for all requests // Set a timeout for requests (in milliseconds)
    headers: {
      'Content-Type': 'application/json', // Set default headers for all requests
      // You can add other headers as needed
    },
  });