import { TouchableOpacity, Text, StyleSheet } from "react-native";

import AppSpinner from "./AppSpinner";
import colors from "../config/colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const AppButton = ({
  title,
  isLoading,
  onPress,
  color = "primary",
  extraStylesForButton,
  extraStylesForText,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        extraStylesForButton,
        { backgroundColor: isLoading ? colors.disabled : colors[color] },
      ]}
      activeOpacity={isLoading ? 1 : 0.2}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <AppSpinner />
      ) : (
        <Text style={[styles.text, extraStylesForText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: responsiveScreenHeight(1.2),
    justifyContent: "center",
    alignItems: "center",
    height: responsiveScreenHeight(5.4),
    width: responsiveScreenWidth(87),
    marginVertical: responsiveScreenWidth(2.5),
  },
  text: {
    color: colors.white,
    fontSize: responsiveScreenFontSize(2.3), //
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});

export default AppButton;
