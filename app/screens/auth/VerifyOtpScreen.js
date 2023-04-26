import {StyleSheet, Image, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {otpVerifySchema} from '../../validations/auth';
import {loginUser, sendOtp} from '../../api/auth';
import {store} from '../../helpers/storage';
import {SET_ROLE, SET_TOKEN} from '../../constants';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppScrollView from '../../components/AppScrollView';
import AppForm from '../../components/form/AppForm';
import AppOtpInput from '../../components/form/AppOtpInput';
import AppSubmitButton from '../../components/form/AppSubmitButton';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const VerifyOtpScreen = ({route}) => {
  const {params} = route;
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = async data => {
    console.log(data);
    const reqData = {
      phone: '966566666666',
      // phone: '966577777777',
      otp: data.otp,
    };

    try {
      const resp = await loginUser(reqData);

      console.log(resp.data);
      if (resp.data.data.token && resp.data.meta.code === 200) {
        store('app_token', resp.data.data.token);
        store('app_role', resp.data.data.role);

        dispatch({type: SET_TOKEN, payload: resp.data.data.token});
        dispatch({type: SET_ROLE, payload: resp.data.data.role});
      }
    } catch (err) {
      console.log('ERROR IN VERIFY', err.response.data);
    }
  };

  const resendCode = async () => {
    const reqData = {
      phone: '01094087595',
    };

    try {
      const resp = await sendOtp(reqData);

      console.log('RESEND CODE: ', resp.data);

      if (resp.data.meta.code === 200) {
        console.log('OTP RE-SEND SUCCESSFULLY');
      }
    } catch (err) {
      console.log('ERROR IN VERIFY', err);
    }
  };

  return (
    <AppScreen style={styles.container}>
      <AppScrollView>
        <Image source={require('../../assets/verify-otp-illustration.png')} />
        <AppForm
          initialValues={{
            otp: '',
          }}
          validationSchema={otpVerifySchema}
          onSubmit={handleSubmit}>
          <AppText style={styles.headingText}>{t('VerifyYourPhone')}</AppText>
          <View>
            <AppText style={styles.textStyles}>
              {t('PleaseEnterThe4DigitCodeSentTo')}
            </AppText>
            <AppText style={styles.textStyles}>
              {t('send to')}{' '}
              <AppText style={styles.textHighlighted}>
                {params?.enteredPhoneNo}
                {/* 03018591990 */}
              </AppText>
            </AppText>
          </View>
          <AppOtpInput name="otp" style={styles.otpContainerStyles} />

          <AppText navigate={resendCode} style={styles.resendTextStyles}>
            {t('recentCode')}
          </AppText>
          <AppSubmitButton title={t('confirm')} />
        </AppForm>
      </AppScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(3),
    backgroundColor: colors.white,
  },
  headingText: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(3),
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: responsiveScreenHeight(4),
  },
  textStyles: {
    textAlign: 'center',
  },
  textHighlighted: {
    color: colors.primary,
    fontWeight: '600',
  },
  otpContainerStyles: {
    marginTop: responsiveScreenHeight(4),
  },
  resendTextStyles: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginTop: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(5),
  },
});

export default VerifyOtpScreen;
