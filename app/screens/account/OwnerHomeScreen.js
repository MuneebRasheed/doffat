import {useState, useEffect} from 'react';
import {StyleSheet, Image, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {getTransactionsOfOwner, withdraw} from '../../api/misc';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppScreenLoading from '../../components/AppScreenLoading';
import TransactionCard from '../../components/cards/TransactionCard';
import ListFooter from '../../components/list/ListFooter';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const OwnerHomeScreen = () => {
  const {t} = useTranslation();
  const [width, setWidth] = useState(0);

  const {token} = useSelector(state => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [withdrawLoading, setWithdrawLoading] = useState(false);

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
      const res = await getTransactionsOfOwner(page, headers);

      if (res.data.meta.code === 200) {
        setTransactions([...transactions, ...res.data.data]);
        setPage(res.data.pagination_meta.current_page);
        setTotalRecords(res.data.pagination_meta.total);

        if (page === 1) {
          setLoading(false);
        } else {
          setPaginationLoading(false);
        }
      }
    } catch (err) {
      console.log('ERROR IN FETCHING TRANSACTION OF OWNER', err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  if (loading) {
    return <AppScreenLoading />;
  }

  const withdrawAPI = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setWithdrawLoading(true);
    try {
      const res = await withdraw(headers);
      console.log('SUCCESS', res.data);
      setWithdrawLoading(false);
    } catch (err) {
      console.log('WITHDRAW API FAIL', err.response.data);
      setWithdrawLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{position: 'relative'}}>
        <Image
          style={{width: responsiveScreenWidth(100)}}
          source={require('../../assets/bg-illustration.png')}
        />
        <View
          style={styles.infoContainer}
          onLayout={event => {
            const {width} = event.nativeEvent.layout;
            setWidth(width);
          }}>
          <AppText style={styles.balanceText}>{t('balance')}</AppText>
          <AppText style={styles.amountText}>12,769.000 SAR</AppText>
        </View>
      </View>
      <View style={styles.withdrawBtnWrapper}>
        <AppButton
          extraStylesForButton={styles.withdrawBtn}
          title={t('withdraw')}
          isLoading={withdrawLoading}
          onPress={withdrawAPI}
        />
      </View>
      <View style={styles.container}>
        <AppText style={styles.headingText}>{t('transactionHistory')}</AppText>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <TransactionCard item={item} />}
          ListFooterComponent={paginationLoading && <ListFooter />}
          onEndReached={() => {
            console.log('derftgyuji', transactions?.length, totalRecords);
            if (transactions?.length < totalRecords && !paginationLoading) {
              setPage(page => page + 1);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: 'center',
    position: 'absolute',
    paddingTop: responsiveScreenHeight(5),
  },

  balanceText: {
    fontSize: responsiveScreenFontSize(2.6),
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
    marginBottom: responsiveScreenHeight(1.7),
  },

  amountText: {
    fontSize: responsiveScreenFontSize(3),
    color: '#FEBC11',
    fontWeight: '600',
  },
  withdrawBtnWrapper: {
    width: responsiveScreenWidth(90),
    paddingHorizontal: responsiveScreenWidth(1.5),
    paddingVertical: responsiveScreenHeight(0),
    borderRadius: responsiveScreenHeight(1),
    backgroundColor: colors.white,
    alignSelf: 'center',
    transform: [{translateY: -30}],
  },
  withdrawBtn: {
    borderRadius: responsiveScreenHeight(1),
  },

  container: {
    padding: responsiveScreenHeight(3),
    paddingTop: responsiveScreenHeight(0),
    backgroundColor: colors.white,
    flex: 1,
  },

  headingText: {
    fontSize: responsiveScreenFontSize(2.2),
    color: colors.primary,
    fontWeight: '500',
    marginBottom: responsiveScreenHeight(3),
  },
});

export default OwnerHomeScreen;
