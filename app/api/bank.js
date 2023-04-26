import axios from "../config/axios-wrapper";

export const updateBankInfo = (data, headers) => {
  console.log(data);
  return axios.put("/owner/update-bank-info", data, headers);
};
