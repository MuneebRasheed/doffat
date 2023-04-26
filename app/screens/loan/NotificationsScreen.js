import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet, FlatList} from 'react-native';

import {
  getOwnerNotifications,
  getRenterNotifications,
} from '../../api/notifications';

import AppScreenLoading from '../../components/AppScreenLoading';
import AppScreen from '../../components/AppScreen';
import NotificationCard from '../../components/cards/NotificationCard';
import colors from '../../config/colors';
import AppHeader from '../../components/AppHeader';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const ViewLoansScreen = () => {
  const {token, role} = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(`BEARER`, token);

    setLoading(true);

    try {
      const res =
        role === 'owner'
          ? await getOwnerNotifications(headers)
          : await getRenterNotifications(headers);

      if (res.data.meta.code === 200) {
        setNotifications(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log('ERROR IN FETCHING NOTIFICATIONS', err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchNotifications();
    }
  }, [isFocused]);

  console.log('NOTIFCATIONS ==>', notifications);

  if (loading) {
    return <AppScreenLoading />;
  }

  return (
    <AppScreen style={styles.container}>
      <AppHeader headerText="Notifications" hideIcon={true} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={item => Math.random().toString()}
        renderItem={({item}) => <NotificationCard item={item} />}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(3),
    backgroundColor: colors.white,
  },
});

export default ViewLoansScreen;
