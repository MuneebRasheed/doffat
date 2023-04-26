import {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';

import {getLoans} from '../../api/loans';
import AppScreen from '../../components/AppScreen';
import AppScreenLoading from '../../components/AppScreenLoading';
import AppSpinner from '../../components/AppSpinner';
import LoanCard from '../../components/cards/LoanCard';
import ListFooter from '../../components/list/ListFooter';
import colors from '../../config/colors';
import routes from '../../routes';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import AppText from '../../components/AppText';

const ViewLoansScreen = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const {PAYMENTS} = routes;

  const fetchLoans = async () => {
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
      const res = await getLoans(page, headers);

      if (res.data.meta.code === 200) {
        setLoans([...loans, ...res.data.data]);
        setPage(res.data.pagination_meta.current_page);
        setTotalRecords(res.data.pagination_meta.total);
        if (page === 1) {
          setLoading(false);
        } else {
          setPaginationLoading(false);
        }
      }
    } catch (err) {
      console.log('ERROR IN FETCHING LOANS', err.response.data);
      setLoading(false);
    }
  };

  const handleNavigation = loanId => {
    navigation.navigate(PAYMENTS, {
      loanId,
    });
  };

  useEffect(() => {
    fetchLoans(page);
  }, [page]);

  if (loading) {
    return <AppScreenLoading />;
  }

  return (
    <AppScreen style={styles.container}>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        data={loans}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <LoanCard item={item} handleNavigation={handleNavigation} />
        )}
        ListFooterComponent={paginationLoading && <ListFooter />}
        onEndReached={() => {
          console.log('derftgyuji', loans?.length, totalRecords);
          if (loans?.length < totalRecords && !paginationLoading) {
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

export default ViewLoansScreen;
