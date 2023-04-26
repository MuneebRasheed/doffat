import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../screens/auth/RegisterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import VerifyOtpScreen from "../screens/auth/VerifyOtpScreen";
import AccountOwnerScreen from "../screens/AccountOwnerScreen";
import routes from "../routes";

const Stack = createNativeStackNavigator();

const headerOptionsExceptWelcomeScreen = {
  headerTitleAlign: "center",
  headerShadowVisible: false,
};

const AuthNavigator = () => {
  const { WELCOME, REGISTER, LOGIN, VERIFICATION } = routes;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={WELCOME}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={REGISTER}
        component={RegisterScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
      <Stack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
      <Stack.Screen
        name={VERIFICATION}
        component={VerifyOtpScreen}
        options={headerOptionsExceptWelcomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
