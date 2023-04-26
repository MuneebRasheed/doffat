import { useFormikContext } from "formik";

import AppButton from "../AppButton";

const AppSubmitButton = ({ title, extraStylesForButton, isLoading }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      extraStylesForButton={extraStylesForButton}
      title={title}
      isLoading={isLoading}
      onPress={handleSubmit}
    />
  );
};

export default AppSubmitButton;
