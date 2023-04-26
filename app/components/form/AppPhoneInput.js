import React, {useRef, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

const AppPhoneInput = ({name, label, labelStyles, containerStyles}) => {
  const {setFieldValue, values, errors, touched} = useFormikContext();
  const phoneInput = useRef(null);

  return (
    <Fragment>
      {label && <AppText style={labelStyles}>{label}</AppText>}
      <PhoneInput
        ref={phoneInput}
        defaultValue={values[name].phone}
        defaultCode="PK"
        layout="first"
        placeholder="3354301121"
        onChangeFormattedText={text => {
          setFieldValue('phoneData', {
            phone: text,
            isPhoneValid: phoneInput.current?.isValidNumber(text),
          });
        }}
        containerStyle={[styles.containerStyle, containerStyles]}
        textInputStyle={styles.textInputStyle}
        codeTextStyle={styles.codeTextStyle}
        textInputProps={{
          placeholderTextColor: colors.medium,
        }}
      />

      {errors[name]?.phone ? (
        <ErrorMessage
          error={errors[name]?.phone}
          visible={errors[name]?.phone}
        />
      ) : (
        <ErrorMessage
          error={errors[name]?.isPhoneValid}
          visible={errors[name]?.isPhoneValid}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: responsiveScreenWidth(93),
    height: responsiveScreenHeight(6.7), //6.7
    borderRadius: responsiveScreenHeight(1.4),
    borderColor: '#E5E5E5',
    borderWidth: responsiveScreenWidth(0.3),
    overflow: 'hidden',
    marginBottom: responsiveScreenHeight(2),
    paddingTop: responsiveScreenHeight(0),
    position: 'relative',
  },
  codeTextStyle: {
    color: colors.medium,
    marginTop: responsiveScreenHeight(-0.5),
  },
  textInputStyle: {
    // paddingTop: responsiveScreenHeight(1),
    position: 'absolute',
    // paddingLeft: responsiveScreenHeight(1),
    left: responsiveScreenHeight(8),
  },
});

export default AppPhoneInput;
