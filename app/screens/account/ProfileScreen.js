import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { updateProfileSchema } from "../../validations/auth";
import { updateProfile } from "../../api/profile";
import { SET_PROFILE } from "../../constants";
import AppScreen from "../../components/AppScreen";
import AppForm from "../../components/form/AppForm";
import AppFormField from "../../components/form/AppFormField";
import AppPhoneInput from "../../components/form/AppPhoneInput";
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

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profile, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const reqData = {
      first_name: values.first_name,
      last_name: values.last_name,
      // phone: values.phoneData?.phone,
      phone: "01094087595",
      otp: "1234",
    };

    console.log(reqData);
    try {
      const res = await updateProfile(reqData, headers);

      if (res.data.meta.code === 200) {
        dispatch({ type: SET_PROFILE, payload: res.data.data });
        setLoading(false);
      }

      console.log(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ERROR IN UPDATING PROFILE", err.response.data);
    }
  };

  return (
    <AppScreen style={styles.container}>
      <AppForm
        initialValues={{
          first_name: profile?.first_name || "",
          last_name: profile?.last_name || "",
          phoneData: {
            phone: "",
            isPhoneValid: false,
          },
        }}
        validationSchema={updateProfileSchema}
        onSubmit={handleSubmit}
      >
        <AppScrollView>
          <AppFormField
            placeholder="First name"
            name="first_name"
            label={t("pfirstname")}
            labelStyles={labelStyles}
            extraStylesForInput={styles.extraStylesForInput}
          />
          <AppFormField
            placeholder="Last name"
            name="last_name"
            label={t("plastname")}
            labelStyles={labelStyles}
          />

          <AppPhoneInput
            name="phoneData"
            label={t("pphone")}
            labelStyles={labelStyles}
          />
        </AppScrollView>

        <AppSubmitButton title={t("save changes")} isLoading={loading} />
      </AppForm>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(3),
    backgroundColor: colors.white,
  },
  extraStylesForInput: {
    marginBottom: responsiveScreenHeight(2),
  },
});

export default ProfileScreen;
