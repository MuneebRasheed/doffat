import { View, TextInput, StyleSheet } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

import colors from "../../config/colors";

const AppTextInput = ({
  icon,
  width = "100%",
  extraStylesForInput,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { width: width }, extraStylesForInput]}>
      <TextInput
        placeholderTextColor={colors.medium}
        {...otherProps}
        style={styles.textInputStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: responsiveScreenHeight(1.4),
    borderColor: "#E5E5E5",
    borderWidth: responsiveScreenWidth(0.3),
    flexDirection: "row",
    height: responsiveScreenHeight(6.7),
    paddingHorizontal: responsiveScreenWidth(3),
    marginBottom: responsiveScreenHeight(1),
  },
  textInputStyle: {
    flex: 1,
    color: colors.dark,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
