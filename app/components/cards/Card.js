import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
const Card = ({ children, extraStyles }) => {
  return (
    <View style={[styles.card, styles.borderShowStyles, extraStyles]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: colors.border,
    borderWidth: responsiveScreenHeight(0.4),
    borderRadius: responsiveScreenHeight(1.6),
    marginBottom: responsiveScreenHeight(3),
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  borderShowStyles:
    Platform.OS === "android"
      ? {
          elevation: 5,
          shadowColor: "#3D576F",
        }
      : {
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
});

export default Card;
