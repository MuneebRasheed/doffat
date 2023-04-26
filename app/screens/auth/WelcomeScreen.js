import {Image, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import AppButton from '../../components/AppButton';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import routes from '../../routes';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const WelcomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {LOGIN, REGISTER} = routes;

  const handleNavigate = route => {
    navigation.navigate(route);
  };
  return (
    <AppScreen style={styles.container}>
      <Image
        style={styles.imageScreen}
        source={require('../../assets/logo.png')}
      />
      <View style={styles.textContainer}>
        <AppText style={styles.appSloganText}>{t('RentNow&PayLater')}</AppText>
        <AppText style={styles.appDescriptionText}>
          {t(
            'text text text text text text text text text text text text text text ',
          )}
        </AppText>
        <View>
          <AppButton
            title={t('createAccount')}
            onPress={() => handleNavigate(REGISTER)}
          />
          <AppButton
            title={t('login')}
            color="white"
            extraStylesForButton={styles.loginBtn}
            extraStylesForText={styles.loginBtnText}
            onPress={() => handleNavigate(LOGIN)}
          />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
  },
  imageScreen: {
    position: 'absolute',
    top: responsiveScreenHeight(10),
    alignSelf: 'center',
  },

  //   useResponsiveHeight
  // useResponsiveWidth
  // useResponsiveFontSize
  // useResponsiveScreenHeight
  // useResponsiveScreenWidth
  // useResponsiveScreenFontSize
  // useDimensionsChange

  appSloganText: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(3),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(1),
  },
  appDescriptionText: {
    width: responsiveScreenWidth(50),
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(7),
  },
  textContainer: {
    height: responsiveScreenHeight(50),
    width: responsiveScreenWidth(100),
    padding: responsiveScreenHeight(3),
    paddingBottom: responsiveScreenHeight(10),
  },
  loginBtn: {
    borderColor: colors.primary,
    borderWidth: responsiveScreenWidth(0.5),
  },
  loginBtnText: {
    color: colors.primary,
  },
});

export default WelcomeScreen;
