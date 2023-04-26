import axios from '../config/axios-wrapper';

export const getApplications = (page, headers) => {
  return axios.get(`/renter/applications?page=${page}&perPage=5`, headers);
};
