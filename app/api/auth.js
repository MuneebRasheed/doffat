import axios from "../config/axios-wrapper";

export const registerUser = (data) => {
  return axios.post("/auth/signup", data);
};

export const loginUser = (data) => {
  return axios.post("/auth/login", data);
};

export const sendOtp = (data) => {
  return axios.post("/auth/sendotp", data);
};
