import { Fragment } from "react";
import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";

const AppFormField = ({
  name,
  label,
  labelStyles,
  width,
  extraStylesForInput,
  ...otherProps
}) => {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();

  return (
    <Fragment>
      {label && <AppText style={labelStyles}>{label}</AppText>}
      <AppTextInput
        extraStylesForInput={extraStylesForInput}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

export default AppFormField;
