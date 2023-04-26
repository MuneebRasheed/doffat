import { useState } from "react";

const useHttp = ({ apiRequest, initialState = [] }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const initiateRequest = async () => {
    try {
      const response = await apiRequest();
      setData(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    initiateRequest,
  };
};

export default useHttp;
