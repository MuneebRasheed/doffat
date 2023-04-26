import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { Slider } from "@miblanchard/react-native-slider";

import colors from "../../config/colors";

const AppSlider = ({
  minimumValue,
  maximumValue,
  step,
  value,
  name,
  setRepaymentValue,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const { primary, border } = colors;

  return (
    <Slider
      minimumValue={1}
      maximumValue={12}
      step={1}
      value={values[name]}
      trackStyle={styles.trackStyles}
      minimumTrackTintColor={primary}
      maximumTrackTintColor={border}
      onValueChange={(e) => {
        setRepaymentValue(e[0]);
        setFieldValue("repaymentPeriod", e[0]);
      }}
    />
  );
};

const styles = StyleSheet.create({
  trackStyles: {
    padding: 2,
    width: "100%",
  },
});

export default AppSlider;
