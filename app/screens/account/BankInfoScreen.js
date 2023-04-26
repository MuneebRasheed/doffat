import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { bankInfoSchema } from "../../validations/auth";
import { updateBankInfo } from "../../api/bank";
import AppScreen from "../../components/AppScreen";
import AppForm from "../../components/form/AppForm";
import AppFormField from "../../components/form/AppFormField";
import AppSubmitButton from "../../components/form/AppSubmitButton";
import AppScrollView from "../../components/AppScrollView";
import colors from "../../config/colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
const labelStyles = {
  marginBottom: 6,
};

const BankInfoScreen = () => {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await updateBankInfo({ ...values, otp: "1234" }, headers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ERROR IN UPDATING BANK INFO", err);
    }
  };

  return (
    <AppScreen style={styles.container}>
      <AppForm
        initialValues={{
          commerical_name: "",
          bank_name: "",
          account_number: "",
          IBAN: "",
        }}
        validationSchema={bankInfoSchema}
        onSubmit={handleSubmit}
      >
        <AppScrollView>
          <AppFormField
            placeholder="Account name"
            name="commerical_name"
            label={t("account_name")}
            labelStyles={labelStyles}
          />
          <AppFormField
            placeholder="At least 8 characters"
            name="bank_name"
            label={t("bank_name")}
          />
          <AppFormField
            placeholder="At least 8 characters"
            name="account_number"
            label={t("account_no")}
            keyboardType="numeric"
          />
          <AppFormField
            placeholder="At least 8 characters"
            name="IBAN"
            label={t("iban")}
            keyboardType="numeric"
          />
        </AppScrollView>

        <AppSubmitButton title={t("save changes")} isLoading={loading} />
      </AppForm>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(2),

    backgroundColor: colors.white,
  },
  extraStylesForInput: {
    marginBottom: responsiveScreenHeight(2),
  },
});

export default BankInfoScreen;
