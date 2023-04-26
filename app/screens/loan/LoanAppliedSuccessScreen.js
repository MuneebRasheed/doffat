import {View, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import AppButton from '../../components/AppButton';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const AccountCreatedScreen = () => {
  const {t} = useTranslation();
  return (
    <AppScreen style={styles.container}>
      <Image source={require('../../assets/loan-applied-illustration.png')} />
      <View style={styles.textContainer}>
        <AppText style={styles.headingText}>{t('thankYou')}</AppText>
        <AppText style={[styles.appDescriptionText, styles.accountSuccessMsg]}>
          {t('discription')}
        </AppText>

        <AppButton title={t('done')} />
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
    paddingBottom: responsiveScreenHeight(3),
  },
  headingText: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(3),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(5),
  },
  accountSuccessMsg: {
    marginBottom: responsiveScreenHeight(2),
  },
  appDescriptionText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(4),
  },
  // termsAndConditionTextContainer: {
  //   marginTop: responsiveScreenHeight(3),
  // },
  // termsAndConditionText: {
  //   fontSize: responsiveScreenFontSize(3),
  //   textAlign: "center",
  //   fontWeight: 600,
  //   marginBottom: 5,
  // },
  // // termsAndConditionLinkText: {
  //   color: colors.primary,
  //   textDecorationLine: "underline",
  // },
});

export default AccountCreatedScreen;
