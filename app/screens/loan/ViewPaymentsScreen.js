import {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {getTransactionsOfloan} from '../../api/loans';
import AppScreen from '../../components/AppScreen';
import AppScreenLoading from '../../components/AppScreenLoading';
import PaymentCard from '../../components/cards/PaymentCard';
import ListFooter from '../../components/list/ListFooter';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import AppText from '../../components/AppText';

const ViewLoansScreen = ({route}) => {
  const {loanId} = route.params;
  const {token} = useSelector(state => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchTransactions = async () => {
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
      const res = await getTransactionsOfloan(1, headers);
      console.log('TRANSACTION DATA ==>', res.data);

      if (res.data.meta.code === 200) {
        setTransactions(res.data.data);
        setPage(res.data.pagination_meta.current_page);
        setTotalRecords(res.data.pagination_meta.total);
        if (page === 1) {
          setLoading(false);
        } else {
          setPaginationLoading(false);
        }
      }
    } catch (err) {
      console.log('ERROR IN FETCHING TRANSACTIONS', err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loanId) {
      fetchTransactions();
    }
  }, [loanId, page]);

  if (loading) {
    return <AppScreenLoading />;
  }

  return (
    <AppScreen style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => <PaymentCard item={item} />}
        ListFooterComponent={paginationLoading && <ListFooter />}
        onEndReached={() => {
          if (transactions?.length < totalRecords && !paginationLoading) {
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
