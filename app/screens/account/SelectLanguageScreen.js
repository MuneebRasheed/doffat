import {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {SET_LANGUAGE} from '../../constants';
import {store} from '../../helpers/storage';
import AppScreen from '../../components/AppScreen';
import AppScrollView from '../../components/AppScrollView';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const SelectLanguageScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {selectedLanguage} = useSelector(state => state.language);
  const [language, setLanguage] = useState(selectedLanguage);

  const handleLanguageChange = async () => {
    try {
      await store('app_language', language);
      dispatch({type: SET_LANGUAGE, payload: language});
    } catch (err) {
      console.log('ERROR WHILE DISPATCHING LANGUAGE', err.message);
    }
  };

  return (
    <AppScreen style={styles.container}>
      <AppScrollView>
        <TouchableOpacity onPress={() => setLanguage('en')}>
          <View
            style={[
              styles.languageContainer,
              language !== 'en' && styles.nonActiveBorderColor,
            ]}>
            <View style={styles.languageTextContainer}>
              <Image
                style={{width: 28, height: 21, borderRadius: 5}}
                source={require('../../assets/england.png')}
              />
              <AppText style={styles.languageText}>English</AppText>
            </View>
            {language === 'en' && (
              <View>
                <Image
                  style={styles.iconStyles}
                  source={require('../../assets/check.png')}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('ar')}>
          <View
            style={[
              styles.languageContainer,
              language !== 'ar' && styles.nonActiveBorderColor,
            ]}>
            <View style={styles.languageTextContainer}>
              <Image
                style={{width: 28, height: 21, borderRadius: 5}}
                source={require('../../assets/saudia.png')}
              />
              <AppText style={styles.languageText}>Arabic</AppText>
            </View>
            {language === 'ar' && (
              <View>
                <Image
                  style={styles.iconStyles}
                  source={require('../../assets/check.png')}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </AppScrollView>
      <AppButton title={t('save changes')} onPress={handleLanguageChange} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(3),
    backgroundColor: colors.white,
  },
  languageContainer: {
    borderColor: colors.primary,
    borderWidth: responsiveScreenWidth(0.5),
    borderRadius: responsiveScreenWidth(2),
    height: responsiveScreenHeight(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(3),
    backgroundColor: colors.light,
  },
  languageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageText: {
    marginLeft: responsiveScreenHeight(1.5),
  },
  iconStyles: {
    width: responsiveScreenWidth(4),
    height: responsiveScreenHeight(2),
  },
  nonActiveBorderColor: {
    borderColor: '#E5E5E5',
  },
});

export default SelectLanguageScreen;
