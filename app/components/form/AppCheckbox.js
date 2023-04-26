import {Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFormikContext} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

const AppCheckbox = ({name, color = 'primary', fillColor = 'light'}) => {
  const {t} = useTranslation();
  const {setFieldValue, values, errors, touched, setFieldTouched} =
    useFormikContext();

  return (
    <Fragment>
      <BouncyCheckbox
        style={{marginBottom: 15}}
        textComponent={
          <View
            style={{
              marginTop: 10,
            }}>
            <AppText style={styles.customTextStyles}>
              {t('BeCreatingYourAccountYouHaveToAgreeWithOur')}
            </AppText>
            <AppText style={styles.customTextStyles}>
              {t('withour')}{' '}
              <AppText style={styles.termsAndConditions}>
                {t('TermsAndConditions')}
              </AppText>
            </AppText>
          </View>
        }
        size={18}
        fillColor={colors[color]}
        unfillColor={colors[fillColor]}
        text="Custom Checkbox"
        innerIconStyle={[styles.innerIconStyle, {borderColor: colors[color]}]}
        onPress={isChecked => {
          if (isChecked) {
            setFieldTouched('isAgreedWithTerms');
          }
          setFieldValue('isAgreedWithTerms', isChecked);
        }}
        isChecked={values[name]}
        textStyle={styles.disableStrikeThrough}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  disableStrikeThrough: {
    textDecorationLine: 'none',
  },
  innerIconStyle: {
    borderWidth: responsiveScreenWidth(0.4),
    borderRadius: responsiveScreenHeight(0.6),
  },
  customTextStyles: {
    marginLeft: responsiveScreenHeight(2),
    fontSize: responsiveScreenFontSize(1.6), //13
  },
  termsAndConditions: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(1.6), //13

    fontWeight: '700',
  },
});

export default AppCheckbox;
