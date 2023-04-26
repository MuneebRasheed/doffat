import { ScrollView } from "react-native";

const AppScrollView = ({ children }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
  );
};

export default AppScrollView;
