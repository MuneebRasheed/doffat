import axios from '../config/axios-wrapper';

export const getTransactionsOfOwner = (page, headers) => {
  return axios.get(`/owner/transactions?page=${page}&perPage=5`, headers);
};

export const withdraw = headers => {
  return axios.put('/owner/withdraw', null, headers);
};
