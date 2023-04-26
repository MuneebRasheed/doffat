import {View, StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import AppText from './AppText';
import colors from '../config/colors';

const AppHeader = ({onPress, headerText, hideIcon = false}) => {
  return (
    <View style={styles.container}>
      {!hideIcon && (
        <IonIcon
          onPress={onPress}
          style={styles.iconStyles}
          name="md-arrow-back"
          size={25}
          color={colors.dark}
        />
      )}
      <AppText style={styles.textStyles}>{headerText}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  iconStyles: {
    position: 'absolute',
    zIndex: 2,
  },
  textStyles: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});

export default AppHeader;
