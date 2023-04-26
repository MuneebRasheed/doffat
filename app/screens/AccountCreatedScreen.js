import {View, Image, StyleSheet} from 'react-native';

import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const AccountCreatedScreen = () => {
  return (
    <AppScreen style={styles.container}>
      <Image source={require('../assets/account-created-illustration.png')} />
      <View style={styles.textContainer}>
        <AppText style={styles.headingText}>WELCOME USER_NAME</AppText>
        <AppText style={[styles.appDescriptionText, styles.accountSuccessMsg]}>
          Your account has been created successfully.
        </AppText>
        <AppText style={styles.appDescriptionText}>
          Press continue to continue using the app
        </AppText>
        <AppButton title="Done" />
        <View style={styles.termsAndConditionTextContainer}>
          <AppText style={styles.termsAndConditionText}>
            By clicking continue, you agree to our
          </AppText>
          <AppText
            style={[
              styles.termsAndConditionText,
              styles.termsAndConditionLinkText,
            ]}>
            Terms and Conditions
          </AppText>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  textContainer: {
    width: responsiveScreenWidth(100),
    padding: responsiveScreenHeight(3),
    paddingBottom: responsiveScreenHeight(1),
  },
  headingText: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(3),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(4),
  },
  accountSuccessMsg: {
    marginBottom: responsiveScreenHeight(0.5),
  },
  appDescriptionText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(7),
  },
  termsAndConditionTextContainer: {
    marginTop: responsiveScreenHeight(1),
  },
  termsAndConditionText: {
    fontSize: responsiveScreenFontSize(1.5),
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: responsiveScreenHeight(1),
  },
  termsAndConditionLinkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default AccountCreatedScreen;
