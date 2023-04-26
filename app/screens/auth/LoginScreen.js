import {Image, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {phoneVerificationSchema} from '../../validations/auth';
import {useKeyboardVisible} from '../../hooks/useKeyboard';
import {sendOtp} from '../../api/auth';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppForm from '../../components/form/AppForm';
import AppSubmitButton from '../../components/form/AppSubmitButton';
import AppPhoneInput from '../../components/form/AppPhoneInput';
import AppLoginRegisterText from '../../components/AppLoginRegisterText';
import colors from '../../config/colors';
import routes from '../../routes';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const isKeyboardVisible = useKeyboardVisible();
  const [loading, setLoading] = useState(false);
  const {REGISTER, VERIFICATION} = routes;
  const handleNavigate = () => {
    navigation.navigate(REGISTER);
  };
  const handleSubmit = async data => {
    setLoading(true);
    const phoneData = {
      // phone: '966577777777',
      phone: '966566666666',
      // phone: data.phoneData.phone,
    };
    try {
      const resp = await sendOtp(phoneData);
      if (resp.data.meta.code === 200) {
        navigation.navigate(VERIFICATION, {
          enteredPhoneNo: data.phoneData.phone,
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <AppScreen style={styles.container}>
      {!isKeyboardVisible && (
        <Image
          style={{
            top: responsiveScreenHeight(5.5),
          }}
          source={require('../../assets/login-illustration.png')}
        />
      )}
      <View style={styles.textContainer}>
        <AppText style={styles.headingText}>{t('welcomeBack')} </AppText>
        <AppText style={styles.appDescriptionText}>{t('text')}</AppText>
        <View>
          <AppForm
            initialValues={{
              phoneData: {
                phone: '',
                isPhoneValid: false,
              },
            }}
            validationSchema={phoneVerificationSchema}
            onSubmit={handleSubmit}>
            <AppPhoneInput
              name="phoneData"
              label={t('phone')}
              labelStyles={styles.labelStyles}
              containerStyles={styles.phoneInputContainer}
            />
            <AppSubmitButton
              extraStylesForButton={styles.extraStylesForButton}
              title={t('log in')}
              isLoading={loading}
            />
          </AppForm>
          <AppLoginRegisterText
            navigate={handleNavigate}
            text={t('Don’tHaveAccount?')}
            linkText={t('signUp')}
          />
        </View>
      </View>
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  headingText: {
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: responsiveScreenFontSize(3),
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(1),
    marginTop: responsiveScreenHeight(6),
  },
  appDescriptionText: {
    width: responsiveScreenWidth(80),
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(1),
  },
  textContainer: {
    height: responsiveScreenHeight(66),
    width: responsiveScreenWidth(100),
    padding: responsiveScreenHeight(3),
    paddingBottom: responsiveScreenHeight(11),
  },
  labelStyles: {
    marginBottom: responsiveScreenHeight(1),
  },
  extraStylesForButton: {
    marginTop: responsiveScreenHeight(2),
  },
});
export default LoginScreen;
