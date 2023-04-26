import {StyleSheet, View, Image} from 'react-native';
import dayjs from 'dayjs';

import Card from './Card';
import AppText from '../AppText';
import AppScrollView from '../AppScrollView';
import colors from '../../config/colors';
import {useTranslation} from 'react-i18next';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const PaymentCard = ({item}) => {
  const {date, body} = item;

  return (
    <Card
      extraStyles={[styles.borderShowStyles, {backgroundColor: colors.white}]}>
      <AppScrollView>
        <View style={styles.innerCardStyles}>
          <View style={[styles.topContainer]}>
            <View style={styles.loanTypeContainer}>
              <View style={styles.backgroudIconView}>
                <Image
                  source={require('../../assets/send-money-illustration.png')}
                />
              </View>
            </View>
            <View style={styles.notificationTextContainer}>
              <AppText style={styles.notificationText}>{body}</AppText>
              <AppText style={styles.notificationTime}>
                {dayjs(date).format('MMM YYYY')}
              </AppText>
            </View>
          </View>
        </View>
      </AppScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCardStyles: {
    padding: responsiveScreenHeight(2),
  },

  borderShowStyles: {
    elevation: 0,
    shadowColor: 'none',
    borderWidth: responsiveScreenHeight(0.2),
    padding: responsiveScreenHeight(1),
  },

  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: colors.border,
  },
  backgroudIconView: {
    backgroundColor: '#ECE7FF',
    width: responsiveScreenWidth(15),
    height: responsiveScreenHeight(9),
    borderRadius: responsiveScreenHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationTextContainer: {
    flexBasis: '80%',
    marginLeft: responsiveScreenHeight(2),
  },

  notificationText: {
    fontSize: responsiveScreenFontSize(1.5),
    lineHeight: responsiveScreenHeight(2),
  },

  notificationAmount: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: responsiveScreenFontSize(1.5),
  },

  notificationTime: {
    fontSize: responsiveScreenFontSize(1.5),

    marginTop: responsiveScreenHeight(2),
  },
});

export default PaymentCard;
