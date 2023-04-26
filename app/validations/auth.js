import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(6, "First name must be at least 6 characters")
    .required("First name is required"),

  last_name: Yup.string()
    .min(6, "Last name must be at least 6 characters")
    .required("Last name is required"),

  type: Yup.string().required().label("Type"),

  national_id: Yup.string()
    .required("National ID is a required")
    .test(
      "len",
      "National ID must be exactly 10 characters",
      (val) => val?.toString().length === 10
    ),

  phoneData: Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
    isPhoneValid: Yup.boolean().isTrue("Phone number is not valid"),
  }),
  isAgreedWithTerms: Yup.boolean().isTrue(
    "Please agree with our terms & conditions"
  ),
});

export const otpVerifySchema = Yup.object().shape({
  otp: Yup.string()
    .required("Please add otp code that you received")
    .test(
      "len",
      "Otp code must be 4 characters",
      (val) => val?.toString().length === 4
    ),
});

export const phoneVerificationSchema = Yup.object().shape({
  phoneData: Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
    isPhoneValid: Yup.boolean().isTrue("Phone number is not valid"),
  }),
});

export const updateProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(6, "First name must be at least 6 characters")
    .required("First name is required"),

  last_name: Yup.string()
    .min(6, "Last name must be at least 6 characters")
    .required("Last name is required"),

  phoneData: Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
    isPhoneValid: Yup.boolean().isTrue("Phone number is not valid"),
  }),
});

export const bankInfoSchema = Yup.object().shape({
  commerical_name: Yup.string()
    .required("Account name is required")
    .min(6, "Accout name must be at least 6 characters"),
  bank_name: Yup.string()
    .required("Bank name is a required")
    .min(8, "Bank name must be at least 8 characters"),
  account_number: Yup.string()
    .required("Account number is a required")
    .min(8, "Account no must be at least 8 characters"),
  IBAN: Yup.string()
    .required("IBAN is a required")
    .min(8, "IBAN must be at least 8 characters"),
  // bank_name: Yup.string()
  //   .required("Bank name is a required")
  //   .test(
  //     "len",
  //     "Bank name must be at least 8 characters",
  //     (val) => val?.toString().length === 8
  //   ),
});
