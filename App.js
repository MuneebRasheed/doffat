import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {getToken} from './app/helpers/storage';
import {SET_ROLE, SET_TOKEN, SET_LANGUAGE} from './app/constants';
import WelcomeScreen from './app/screens/auth/WelcomeScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import VerifyOtpScreen from './app/screens/auth/VerifyOtpScreen';
import AccountCreatedScreen from './app/screens/AccountCreatedScreen';
import AccountDashboardScreen from './app/screens/account/AccountDashboardScreen';
import ProfileScreen from './app/screens/account/ProfileScreen';
import BankInfoScreen from './app/screens/account/BankInfoScreen';
import SelectLanguageScreen from './app/screens/account/SelectLanguageScreen';
import ViewLoansScreen from './app/screens/loan/ViewLoansScreen';
import ViewApplicationsScreen from './app/screens/loan/ViewApplicationsScreen';
import ViewPaymentsScreen from './app/screens/loan/ViewPaymentsScreen';
import ApplyLoanScreen from './app/screens/loan/ApplyLoanScreen';
import LoanAppliedSuccessScreen from './app/screens/loan/LoanAppliedSuccessScreen';
import NotificationsScreen from './app/screens/loan/NotificationsScreen';
import OwnerHomeScreen from './app/screens/account/OwnerHomeScreen';
import AuthNavigator from './app/navigation/AuthNavigator';
import AccountNavigator from './app/navigation/AccountNavigator';
import AppNavigator from './app/navigation/AppNavigator';

import store from './app/store';
import AppScreen from './app/components/AppScreen';
import AppText from './app/components/AppText';
import './app/translations/i18n';

const AppContent = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const {selectedLanguage} = useSelector(state => state.language);
  const {i18n} = useTranslation();

  useEffect(() => {
    const setTokenIfUserIsLogin = async () => {
      const token = await getToken('app_token');
      const role = await getToken('app_role');
      if (token) {
        dispatch({type: SET_TOKEN, payload: token});
        dispatch({type: SET_ROLE, payload: role});
      }
    };

    setTokenIfUserIsLogin();
  }, []);

  useEffect(() => {
    const setAppLanguage = async () => {
      try {
        const lang = await getToken('app_language');
        const applyLanguage = lang || selectedLanguage;
        dispatch({type: SET_LANGUAGE, payload: applyLanguage});
        const isLangaugeSet = await i18n.changeLanguage(applyLanguage);
        if (isLangaugeSet) {
          console.log('LANGUAGE SET', applyLanguage);
        }
      } catch (err) {
        console.log('ERROR WHILE SETTING LANGUAGE', err);
      }
    };

    setAppLanguage();
  }, [selectedLanguage]);

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
