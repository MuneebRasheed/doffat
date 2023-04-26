import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ViewLoansScreen from '../screens/loan/ViewLoansScreen';
import ViewPaymentsScreen from '../screens/loan/ViewPaymentsScreen';

import routes from '../routes';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerTitleAlign: 'center',
  headerShadowVisible: false,
};

const LoanPaymetNavigator = () => {
  const {LOANS, PAYMENTS} = routes;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LOANS}
        component={ViewLoansScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name={PAYMENTS}
        component={ViewPaymentsScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export default LoanPaymetNavigator;
