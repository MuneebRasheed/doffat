import {StyleSheet} from 'react-native';
import colors from '../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import AppText from './AppText';

const AppLoginRegisterText = ({navigate, text, linkText}) => {
  return (
    <AppText style={styles.textStyles}>
      {text}{' '}
      <AppText navigate={navigate} style={styles.loginRegisterText}>
        {linkText}
      </AppText>
    </AppText>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '400',
    color: colors.black,
    marginTop: responsiveScreenHeight(-1),
    textAlign: 'center',
  },
  loginRegisterText: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default AppLoginRegisterText;
