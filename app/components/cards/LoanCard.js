import {StyleSheet, View} from 'react-native';
import dayjs from 'dayjs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import Card from './Card';
import AppButton from '../AppButton';
import AppText from '../AppText';
import colors from '../../config/colors';
import {useTranslation} from 'react-i18next';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const LoanCard = ({item, handleNavigation}) => {
  const {t} = useTranslation();
  const {primary} = colors;

  const {amount, end_date, id} = item;

  return (
    <Card>
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
              <AppText style={styles.loanTypePrimaryText}>Rent Loan</AppText>
              <AppText style={styles.loanTypeSecondaryText}>3384933e</AppText>
            </View>
          </View>
          <View>
            <AppText style={styles.loanAmount}>{amount} SAR</AppText>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.middleContainerFirstHalf}>
            <AppText style={styles.loanTypeSecondaryText}>
              {t('period')}
            </AppText>
            <AppText
              style={[
                styles.loanTypePrimaryText,
                styles.applyMarginOnMiddleText,
              ]}>
              6 months
            </AppText>
          </View>
          <View style={styles.middleContainerSecondHalf}>
            <AppText style={styles.loanTypeSecondaryText}>
              {t('endDate')}
            </AppText>
            <AppText
              style={[
                styles.loanTypePrimaryText,
                styles.applyMarginOnMiddleText,
              ]}>
              {dayjs(end_date).format('MMM YYYY')}
            </AppText>
          </View>
        </View>
      </View>
      <AppButton
        title={t('viewPayments')}
        extraStylesForButton={styles.extraStylesForButton}
        extraStylesForText={styles.extraStylesForText}
        onPress={() => handleNavigation(id)}
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
    borderBottomWidth: responsiveScreenWidth(0.8),
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
  },

  loanTypeSecondaryText: {
    fontSize: responsiveScreenFontSize(1.8),

    marginTop: responsiveScreenHeight(0.5),
  },

  loanAmount: {
    color: colors.primary,
    fontWeight: '600',
  },

  backgroudIconView: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: responsiveScreenHeight(50),
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveScreenHeight(0.5),
    paddingBottom: responsiveScreenHeight(2),
  },

  applyMarginOnMiddleText: {
    marginTop: responsiveScreenHeight(0.8),
  },

  extraStylesForButton: {
    marginVertical: responsiveScreenHeight(0),
    borderRadius: responsiveScreenHeight(0),
    height: responsiveScreenHeight(5),
  },
  extraStylesForText: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '500',
  },
});

export default LoanCard;
