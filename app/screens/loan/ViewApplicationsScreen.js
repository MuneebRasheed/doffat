import {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {getApplications} from '../../api/applications';
import AppScreen from '../../components/AppScreen';
import AppScreenLoading from '../../components/AppScreenLoading';
import ApplicationCard from '../../components/cards/ApplicationCard';
import AppHeader from '../../components/AppHeader';
import ListFooter from '../../components/list/ListFooter';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import routes from '../../routes';

const ViewApplicationsScreen = ({navigation}) => {
  const {TAB_ACCOUNT_NAVIGATOR} = routes;
  const isFocused = useIsFocused();
  const {token} = useSelector(state => state.auth);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchApplications = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (page === 1) {
      setLoading(true);
    } else {
      setPaginationLoading(true);
    }

    try {
      const res = await getApplications(page, headers);

      if (res.data.meta.code === 200) {
        setApplications([...applications, ...res.data.data]);
        setPage(res.data.pagination_meta.current_page);
        setTotalRecords(res.data.pagination_meta.total);
        if (page === 1) {
          setLoading(false);
        } else {
          setPaginationLoading(false);
        }
      }
    } catch (err) {
      console.log('ERROR IN FETCHING APPLICATIONS', err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchApplications();
    }

    if (!isFocused) {
      setApplications([]);
      setLoading(false);
      setPaginationLoading(false);
      setPage(1);
      setTotalRecords(0);
    }
  }, [isFocused, page]);

  if (loading) {
    return <AppScreenLoading />;
  }

  return (
    <AppScreen style={styles.container}>
      <AppHeader
        onPress={() => {
          navigation.navigate(TAB_ACCOUNT_NAVIGATOR);
        }}
        headerText="Applications"
      />
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        data={applications}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ApplicationCard item={item} />}
        ListFooterComponent={paginationLoading && <ListFooter />}
        onEndReached={() => {
          if (applications?.length < totalRecords && !paginationLoading) {
            setPage(page => page + 1);
          }
        }}
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

export default ViewApplicationsScreen;
