import axios from "axios";
import { deleteAccessToken, getAccessToken, setAccessToken } from "./auth";

class HTTP {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.access_token = getAccessToken();

    // Request Interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token) {
          config.headers.Authorization = `Bearer ${this.access_token}`;
        }
        return config; // Must return config
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        const url = response.config.url;

        if (url === "/auth/login" || url === "/auth/register") {
          try {
            const { token } = response.data;
            if (token) {
              this.access_token = token;
              setAccessToken(token);
            }
          } catch (error) {
            console.error("Error setting token:", error);
          }
        } else if (url === "/auth/logout") {
          this.access_token = "";
          deleteAccessToken();
        }
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          console.log("Error at response: Unauthorized (401)");
        }
        return Promise.reject(error);
      }
    );
  }
}

// Correct instantiation
const http = new HTTP().instance;
export default http;
