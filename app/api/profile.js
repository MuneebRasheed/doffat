import axios from "../config/axios-wrapper";

export const getOwnerProfile = (headers) => {
  return axios.get("/owner/info", headers);
};

export const getRenterProfile = (headers) => {
  return axios.get("/renter/info", headers);
};

export const updateProfile = (body, headers) => {
  return axios.put("/general/update-profile", body, headers);
};
