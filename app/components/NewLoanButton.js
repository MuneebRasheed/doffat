import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

const NewLoanButton = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 20,
    borderColor: colors.white,
    borderWidth: 8,
  },
});

export default NewLoanButton;
