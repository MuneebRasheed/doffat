import { StyleSheet, StatusBar, Platform, SafeAreaView } from "react-native";

const AppScreen = ({ style, children }) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

export default AppScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
