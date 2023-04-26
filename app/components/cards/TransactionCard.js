import {StyleSheet, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import dayjs from 'dayjs';

import Card from './Card';
import AppText from '../AppText';
import colors from '../../config/colors';

const PaymentCard = ({item}) => {
  const {t} = useTranslation();

  const {primary} = colors;
  const {created_at, amount, type, status} = item;

  return (
    <Card style={[styles.card]} extraStyles={{marginBottom: 10}}>
      <View style={styles.innerCardStyles}>
        <View style={[styles.topContainer]}>
          <View style={styles.loanTypeContainer}>
            <View style={styles.backgroudIconView}>
              <FeatherIcon name="file-text" size={20} color={primary} />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}>
              <AppText style={styles.loanTypePrimaryText}>
                {dayjs(created_at).format('DD-MM-YYYY')}
              </AppText>
              <AppText
                style={[
                  styles.loanTypeSecondaryText,
                  {
                    color:
                      status === 'rejected'
                        ? '#DB1F35'
                        : status === 'pending' || status === 'processing'
                        ? '#E08508'
                        : status === 'completed'
                        ? '#006C35'
                        : null,
                  },
                ]}>
                {/* {isPaid ? t('completed') : t('pending')} */}
                {status === 'rejected'
                  ? t('rejected')
                  : status === 'pending' || status === 'processing'
                  ? t('pending')
                  : status === 'completed'
                  ? t('completed')
                  : null}
              </AppText>
            </View>
          </View>
          <View>
            <AppText
              style={[
                styles.loanAmount,
                {color: type === 'cashin' ? '#006C35' : '#DB1F35'},
              ]}>
              {amount} SAR
            </AppText>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCardStyles: {
    padding: 10,
    marginBottom: 10,
  },

  topContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: colors.border,
  },

  loanTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loanTypePrimaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },

  loanTypeSecondaryText: {
    fontSize: 15,
    marginTop: 1,
    fontWeight: '600',
  },

  loanAmount: {
    fontWeight: '600',
  },

  backgroudIconView: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 20,
  },

  applyMarginOnMiddleText: {
    marginTop: 5,
  },

  extraStylesForButton: {
    marginVertical: 0,
    borderRadius: 0,
    height: 35,
  },
  extraStylesForText: {
    fontSize: 16,
    fontWeight: '500',
  },
  textStyles: {
    paddingTop: 5,
    alignSelf: 'center',
  },
});

export default PaymentCard;
