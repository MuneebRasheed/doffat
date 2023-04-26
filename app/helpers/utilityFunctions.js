export const formatDate = date => {
  const currentDate = date;
  let tempDate = new Date(currentDate);

  tempDate =
    tempDate.getDate() +
    '/' +
    (tempDate.getMonth() + 1) +
    '/' +
    tempDate.getFullYear();

  return tempDate;
};
