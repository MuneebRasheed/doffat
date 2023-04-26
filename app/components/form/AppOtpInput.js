import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import OTPTextInput from "react-native-otp-textinput";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const AppOtpInput = ({ name, style }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  return (
    <View style={[styles.container, style]}>
      <OTPTextInput
        defaultValue={values[name]}
        textInputStyle={styles.textInputStyle}
        tintColor="#000000"
        inputCount={4}
        handleTextChange={(e) => setFieldValue(name, e)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: responsiveScreenWidth(70),
  },
  textInputStyle: {
    backgroundColor: colors.light,
    borderWidth: responsiveScreenWidth(0.3),
    borderBottomWidth: responsiveScreenWidth(0.3),
    borderRadius: responsiveScreenWidth(4),
    borderColor: colors.primary,
  },
});

export default AppOtpInput;
