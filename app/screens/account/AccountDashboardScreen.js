import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useTranslation} from 'react-i18next';

import {REMOVE_TOKEN, SET_PROFILE, SET_PROFILE_LOADING} from '../../constants';
import {removeToken} from '../../helpers/storage';
import {getOwnerProfile, getRenterProfile} from '../../api/profile';
import AppScreen from '../../components/AppScreen';
import AppButton from '../../components/AppButton';
import AppScreenLoading from '../../components/AppScreenLoading';
import AppScrollView from '../../components/AppScrollView';
import ListItem from '../../components/list/ListItem';
import colors from '../../config/colors';
import routes from '../../routes';

const AccountDashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {token, profile, isProfileLoading, role} = useSelector(
    state => state.auth,
  );

  const {primary, secondary} = colors;
  const {PROFILE_UPDATE, SELECT_LANGUAGE, BANK_INFO} = routes;

  const handleNavigate = routeName => {
    navigation.navigate(routeName);
  };

  const handleLogout = async () => {
    const isLogoutSuccessfull = await removeToken('app_token');
    const isRoleRemoved = await removeToken('app_role');
    if (isLogoutSuccessfull && isRoleRemoved) {
      dispatch({type: REMOVE_TOKEN});
    }
  };

  const getProfile = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({type: SET_PROFILE_LOADING});

    try {
      let res;

      if (role === 'renter') {
        res = await getRenterProfile(headers);
      } else {
        res = await getOwnerProfile(headers);
      }

      if (res.data.meta.code === 200) {
        dispatch({type: SET_PROFILE, payload: res.data.data});
      }
    } catch (err) {
      console.log('ERROR IN FETCHING PROFILE', err.response.data);
    }
  };

  useEffect(() => {
    if (role) {
      console.log('RUNNING');
      getProfile();
    }
  }, [role]);

  if (isProfileLoading) {
    return <AppScreenLoading />;
  }

  return (
    <AppScreen style={styles.container}>
      <AppScrollView>
        <ListItem
          imageUrl={require('../../assets/avatar.png')}
          userData={{
            first_name: profile?.first_name,
            last_name: profile?.last_name,
            phone: profile?.user?.phone,
          }}
          extraStyles={styles.userInfoExtraStyles}
        />
        <ListItem
          PrimaryIcon={
            <Icon name="ios-person-circle-outline" size={30} color={primary} />
          }
          text={t('profile')}
          SecondaryIcon={
            <Icon
              name="ios-chevron-forward-sharp"
              size={20}
              color={secondary}
            />
          }
          handleClick={() => handleNavigate(PROFILE_UPDATE)}
        />

        <ListItem
          PrimaryIcon={<Icon name="globe-outline" size={30} color={primary} />}
          text={t('language')}
          SecondaryIcon={
            <Icon
              name="ios-chevron-forward-sharp"
              size={20}
              color={secondary}
            />
          }
          handleClick={() => handleNavigate(SELECT_LANGUAGE)}
        />
        {role !== 'renter' && (
          <ListItem
            PrimaryIcon={
              <Icon
                name="ios-document-text-outline"
                size={30}
                color={primary}
              />
            }
            text={t('bankinfo')}
            SecondaryIcon={
              <Icon
                name="ios-chevron-forward-sharp"
                size={20}
                color={secondary}
              />
            }
            handleClick={() => handleNavigate(BANK_INFO)}
          />
        )}
      </AppScrollView>
      <AppButton
        extraStylesForText={styles.extraStylesForText}
        onPress={handleLogout}
        title={t('log out')}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(3),
    backgroundColor: colors.white,
    flex: 1,
  },
  userInfoExtraStyles: {
    marginBottom: responsiveScreenHeight(3),
    paddingVertical: responsiveScreenHeight(0),
    borderBottomWidth: responsiveScreenHeight(0),
  },
  extraStylesForText: {
    textTransform: 'none',
  },
});

export default AccountDashboardScreen;
