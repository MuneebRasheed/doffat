import axios from '../config/axios-wrapper';

export const getLoans = (page, headers) => {
  return axios.get(`/renter/loans?page=${page}&perPage=5`, headers);
};

export const addLoans = (body, headers) => {
  return axios.post('/renter/loan-apply', body, headers);
};

export const getTransactionsOfloan = (loanId, headers) => {
  return axios.get(`/renter/transactions?load_id=${loanId}`, headers);
};
