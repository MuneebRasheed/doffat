import { ActivityIndicator } from "react-native";

import colors from "../config/colors";

const AppSpinner = ({ color = "white" }) => {
  return <ActivityIndicator size="large" color={colors[color]} />;
};

export default AppSpinner;
