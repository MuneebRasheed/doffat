import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialCommmunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import AccountNavigator from './AccountNavigator';
import LoanPaymetNavigator from './LoanPaymentNavigation';

import ApplyLoanScreen from '../screens/loan/ApplyLoanScreen';
import ViewApplicationsScreen from '../screens/loan/ViewApplicationsScreen';
import NotificationsScreen from '../screens/loan/NotificationsScreen';
import OwnerHomeScreen from '../screens/account/OwnerHomeScreen';
import NewLoanButton from '../components/NewLoanButton';

import colors from '../config/colors';
import routes from '../routes';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const {primary, secondary} = colors;
  const {role} = useSelector(state => state.auth);
  const {
    TAB_ACCOUNT_NAVIGATOR,
    TAB_LOAN_PAYMENT_NAVIGATOR,
    APPLY_LOAN,
    APPLICATIONS,
    NOTIFICATIONS,
    OWNER_HOME,
  } = routes;

  console.log('CURRENT role', role);

  if (role && role === 'owner') {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: secondary,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
        initialRouteName={TAB_ACCOUNT_NAVIGATOR}>
        <Tab.Screen
          name={OWNER_HOME}
          component={OwnerHomeScreen}
          options={{
            tabBarIcon: ({color, focused}) => {
              return focused ? (
                <MaterialIcon name="home-filled" size={30} color={color} />
              ) : (
                <OcticonIcon name="home" size={25} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name={NOTIFICATIONS}
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size, focused}) => {
              const className = focused
                ? 'notifications'
                : 'notifications-none';
              return <MaterialIcon name={className} size={30} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name={TAB_ACCOUNT_NAVIGATOR}
          component={AccountNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              const className = focused ? 'person' : 'person-outline';
              return <IonIcon name={className} size={30} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: secondary,
        headerShown: false,
        tabBarLabel: () => {
          return null;
        },
      }}
      initialRouteName={TAB_ACCOUNT_NAVIGATOR}>
      <Tab.Screen
        name={APPLICATIONS}
        component={ViewApplicationsScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return focused ? (
              <MaterialIcon name="home-filled" size={30} color={color} />
            ) : (
              <OcticonIcon name="home" size={25} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name={TAB_LOAN_PAYMENT_NAVIGATOR}
        component={LoanPaymetNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            const className = focused ? 'chart-box' : 'chart-box-outline';
            return (
              <MaterialCommmunityIcon
                name={className}
                size={30}
                color={color}
              />
            );
          },
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name={APPLY_LOAN}
        component={ApplyLoanScreen}
        options={({navigation}) => ({
          tabBarButton: () => (
            <NewLoanButton
              onPress={() => {
                navigation.navigate(APPLY_LOAN);
              }}>
              <MaterialIcon
                name="add-circle-outline"
                color={colors.white}
                size={40}
              />
            </NewLoanButton>
          ),
          headerShown: false,
          unmountOnBlur: true,
        })}
      />

      <Tab.Screen
        name={NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => {
            const className = focused ? 'notifications' : 'notifications-none';
            return <MaterialIcon name={className} size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={TAB_ACCOUNT_NAVIGATOR}
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            const className = focused ? 'person' : 'person-outline';
            return <IonIcon name={className} size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
