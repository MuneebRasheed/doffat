import {Text, StyleSheet} from 'react-native';
import colors from '../config/colors';

const AppText = ({navigate, children, style, ...otherProps}) => {
  return (
    <Text
      {...otherProps}
      onPress={navigate && navigate}
      style={[styles.textStyles, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.secondary,
  },
});

export default AppText;
