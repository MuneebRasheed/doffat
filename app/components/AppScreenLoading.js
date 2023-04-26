import { View, StyleSheet } from 'react-native';
import AppSpinner from './AppSpinner';

const AppScreenLoading = () => {
  return (
    <View style={styles.container}>
      <AppSpinner color='primary' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppScreenLoading;
