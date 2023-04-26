import { useEffect } from "react";
import { Text } from "react-native";

import { useSelector } from "react-redux";
import axios from "axios";

import AppScreen from "../components/AppScreen";

const AccountOwnerScreen = () => {
  const { token } = useSelector((state) => state.auth);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://178.128.133.180/api/owner/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AppScreen>
      <Text>AccountOwnerScreen</Text>
    </AppScreen>
  );
};

export default AccountOwnerScreen;
