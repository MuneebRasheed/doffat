import axios from '../config/axios-wrapper';

export const getRenterNotifications = headers => {
  return axios.get('/renter/notifications', headers);
};

export const getOwnerNotifications = headers => {
  return axios.get('/owner/notifications', headers);
};
