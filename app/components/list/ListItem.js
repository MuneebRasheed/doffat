import {Fragment} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import colors from '../../config/colors';
import AppText from '../AppText';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const ImageComponent = ({imageUrl, userData}) => {
  return (
    <Fragment>
      <Image style={styles.listImage} source={imageUrl} />
      <View style={styles.userInfoContainer}>
        <AppText style={styles.userName}>
          {userData?.first_name} {userData?.last_name}
        </AppText>
        <AppText>+{userData?.phone}</AppText>
      </View>
    </Fragment>
  );
};

const IconComponent = ({PrimaryIcon, SecondaryIcon, text}) => {
  return (
    <Fragment>
      {PrimaryIcon}
      <View style={styles.iconTextContainer}>
        <AppText style={styles.iconText}>{text}</AppText>
        {SecondaryIcon}
      </View>
    </Fragment>
  );
};

const ListItem = ({
  imageUrl,
  userData,
  PrimaryIcon,
  SecondaryIcon,
  extraStyles,
  text,
  handleClick,
}) => {
  return (
    <TouchableOpacity onPress={handleClick && handleClick}>
      <View style={[styles.listContainer, extraStyles]}>
        {imageUrl ? (
          <ImageComponent imageUrl={imageUrl} userData={userData} />
        ) : (
          <IconComponent
            PrimaryIcon={PrimaryIcon}
            SecondaryIcon={SecondaryIcon}
            text={text}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: responsiveScreenHeight(0.1),
    paddingVertical: responsiveScreenHeight(1.1),
    borderBottomColor: colors.border,
  },
  listImage: {
    width: responsiveScreenWidth(17),
    height: responsiveScreenHeight(9),
    borderRadius: responsiveScreenHeight(7),
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: responsiveScreenHeight(2),
  },

  userName: {
    fontSize: responsiveScreenFontSize(2.2),
    color: colors.text,
    fontWeight: '500',
    marginBottom: responsiveScreenHeight(0.5),
  },

  iconTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: responsiveScreenHeight(1.6),
  },
  iconText: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '400',
    color: colors.text,
    marginBottom: responsiveScreenFontSize(0.5),
  },
});
