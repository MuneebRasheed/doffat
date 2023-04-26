import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import dayjs from 'dayjs';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Card from './Card';
import AppText from '../AppText';
import colors from '../../config/colors';

const ApplicationCard = ({item}) => {
  const {t} = useTranslation();
  const {primary} = colors;

  return (
    <Card style={[styles.card, styles.borderShowStyles]}>
      <View style={styles.innerCardStyles}>
        <View style={styles.topContainer}>
          <View style={styles.loanTypeContainer}>
            <View style={styles.backgroudIconView}>
              <FontAwesomeIcon
                name="hand-holding-usd"
                size={18}
                color={primary}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}>
              <AppText style={styles.loanTypePrimaryText}>
                {t('rent_application')}
              </AppText>
              <AppText style={styles.loanTypeSecondaryText}>{item?.id}</AppText>
            </View>
          </View>
          <View>
            <AppText style={styles.loanAmount}>{item?.amount} SAR</AppText>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <View>
            <AppText style={styles.loanTypeSecondaryText}>
              {t('endDate')}
            </AppText>
            <AppText
              style={[
                styles.loanTypePrimaryText,
                styles.applyMarginOnMiddleText,
              ]}>
              {item?.end_date
                ? dayjs(item?.end_date).format('MMM YYYY')
                : 'N-A'}
            </AppText>
          </View>
          <View>
            <AppText style={styles.loanTypeSecondaryText}>
              {' '}
              {t('period')}
            </AppText>
            <AppText
              style={[
                styles.loanTypePrimaryText,
                styles.applyMarginOnMiddleText,
              ]}>
              {item?.number_of_payments} months
            </AppText>
          </View>
          <View>
            <AppText style={styles.loanTypeSecondaryText}>
              {t('status')}
            </AppText>
            <AppText
              style={[
                styles.loanTypePrimaryText,
                styles.applyMarginOnMiddleText,
                {color: item?.status === 'rejected' ? '#DB1F35' : '#E08508'},
              ]}>
              {item?.status || 'N-A'}
            </AppText>
          </View>
        </View>
        <AppText numberOfLines={1} style={styles.textStyles}>
          {/* Notes: xxxxx . xxxxx . xxxxx . xxxxx . xxxxx. xxxxx */}
          Notes: {item?.public_notes ? item?.public_notes : 'No notes found'}
        </AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCardStyles: {
    padding: responsiveScreenHeight(2),
  },

  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: responsiveScreenHeight(2),
  },

  loanTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loanTypePrimaryText: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'capitalize',
  },

  loanTypeSecondaryText: {
    fontSize: responsiveScreenFontSize(1.7),
    marginTop: responsiveScreenHeight(0.6),
  },

  loanAmount: {
    color: colors.primary,
    fontWeight: '600',
  },

  backgroudIconView: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: responsiveScreenHeight(1.2),
    paddingVertical: responsiveScreenHeight(1.2),
    borderRadius: responsiveScreenHeight(50),
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveScreenHeight(0.5),
    paddingBottom: responsiveScreenHeight(1.8),
    borderBottomWidth: responsiveScreenWidth(1),
    borderBottomColor: colors.border,
  },

  applyMarginOnMiddleText: {
    marginTop: responsiveScreenHeight(1),
  },
  textStyles: {
    paddingTop: responsiveScreenHeight(2),
  },
});

export default ApplicationCard;
