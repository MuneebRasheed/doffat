import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountDashboardScreen from "../screens/account/AccountDashboardScreen";
import ProfileScreen from "../screens/account/ProfileScreen";
import BankInfoScreen from "../screens/account/BankInfoScreen";
import SelectLanguageScreen from "../screens/account/SelectLanguageScreen";
import routes from "../routes";

const Stack = createNativeStackNavigator();

const headerOptionsExceptWelcomeScreen = {
  headerTitleAlign: "center",
  headerShadowVisible: false,
};

const AccountNavigator = () => {
  const { ACCOUNT_DASHBOARD, PROFILE_UPDATE, BANK_INFO, SELECT_LANGUAGE } =
    routes;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ACCOUNT_DASHBOARD}
        component={AccountDashboardScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
      <Stack.Screen
        name={PROFILE_UPDATE}
        component={ProfileScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
      <Stack.Screen
        name={BANK_INFO}
        component={BankInfoScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
      <Stack.Screen
        name={SELECT_LANGUAGE}
        component={SelectLanguageScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
