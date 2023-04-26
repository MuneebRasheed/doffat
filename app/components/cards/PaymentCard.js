import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import FeatherIcon from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';

import Card from './Card';
import AppButton from '../AppButton';
import AppText from '../AppText';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const PaymentCard = ({item}) => {
  const {t} = useTranslation();
  const {primary} = colors;
  const {created_at, amount, status} = item;

  return (
    <Card style={[styles.card, styles.borderShowStyles]}>
      <View style={styles.innerCardStyles}>
        <View
          style={[
            styles.topContainer,
            // {
            //   borderBottomWidth: isPaid ? 1 : 0,
            // },
          ]}>
          <View style={styles.loanTypeContainer}>
            <View style={styles.backgroudIconView}>
              <FeatherIcon name="file-text" size={20} color={primary} />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}>
              <AppText style={styles.loanTypePrimaryText}>
                {created_at
                  ? dayjs(item?.created_at).format('MMMM DD, YYYY')
                  : 'N-A'}
              </AppText>
              <AppText
                style={[
                  styles.loanTypeSecondaryText,
                  // {color: isPaid ? '#006C35' : '#E08508'},
                  {color: '#E08508'},
                ]}>
                {/* /{isPaid ? t('paid') : t('scheduled')} */}
                {status}
              </AppText>
            </View>
          </View>
          <View>
            <AppText style={styles.loanAmount}>{amount} SAR</AppText>
          </View>
        </View>
        {/* {isPaid && (
          <AppText numberOfLines={1} style={styles.textStyles}>
            Paid at {date} using Sadaad
          </AppText>
        )} */}
      </View>

      <AppButton
        title={t('payEarly')}
        extraStylesForButton={styles.extraStylesForButton}
        extraStylesForText={styles.extraStylesForText}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCardStyles: {
    padding: responsiveScreenHeight(1.5),
  },

  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: responsiveScreenHeight(1),
    borderBottomColor: colors.border,
  },

  loanTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loanTypePrimaryText: {
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: '600',
    color: colors.primary,
  },

  loanTypeSecondaryText: {
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenHeight(1),
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  loanAmount: {
    color: colors.primary,
    fontWeight: '600',
  },

  backgroudIconView: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: responsiveScreenHeight(5),
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveScreenHeight(2),
    paddingBottom: responsiveScreenHeight(1),
  },

  applyMarginOnMiddleText: {
    marginTop: responsiveScreenHeight(2),
  },

  extraStylesForButton: {
    marginVertical: responsiveScreenHeight(0),
    borderRadius: responsiveScreenHeight(0),
    height: responsiveScreenHeight(5),
  },
  extraStylesForText: {
    fontSize: responsiveScreenFontSize(2.2),
    fontWeight: '500',
  },
  textStyles: {
    paddingTop: responsiveScreenHeight(2),
    alignSelf: 'center',
  },
});

export default PaymentCard;
