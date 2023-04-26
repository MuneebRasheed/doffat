import {StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

import {registerSchema} from '../../validations/auth';
import {registerUser, sendOtp} from '../../api/auth';
import AppScreen from '../../components/AppScreen';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import AppPhoneInput from '../../components/form/AppPhoneInput';
import AppSelect from '../../components/form/AppSelect';
import AppCheckbox from '../../components/form/AppCheckbox';
import AppSubmitButton from '../../components/form/AppSubmitButton';
import AppLoginRegisterText from '../../components/AppLoginRegisterText';
import AppScrollView from '../../components/AppScrollView';
import colors from '../../config/colors';
import routes from '../../routes';

const labelStyles = {
  marginTop: responsiveScreenHeight(0.4),
};

const RegisterScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {LOGIN} = routes;

  const items = [
    {label: t('renter'), value: 'renter'},
    {label: t('owner'), value: 'owner'},
  ];

  const handleSubmit = async data => {
    const {
      first_name,
      last_name,
      phoneData: {phone},
      national_id,
      type,
    } = data;

    const reqData = {
      first_name: 'John',
      last_name: 'Smith',
      phone: '0104401101560',
      national_id: '18805366667337275',
      type: 'owner',
      otp: '1234',
    };

    try {
      const respOne = await sendOtp({phone: reqData.phone});
      const respTwo = await registerUser(reqData);
      if (respOne.data.meta.code === 200 && respTwo.data.meta.code === 200) {
        console.log('SUCCESS');
      }
    } catch (err) {
      console.log('ERROR: ', err.response.data);
    }
  };

  const handleNavigate = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            first_name: 'Stephen',
            last_name: 'Grider',
            type: 'renter',
            national_id: '8874488744',
            phoneData: {
              phone: '',
              isPhoneValid: false,
            },
            isAgreedWithTerms: false,
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}>
          <AppFormField
            placeholder="First name"
            name="first_name"
            label={t('firstName')}
            labelStyles={labelStyles}
          />
          <AppFormField
            placeholder="Last name"
            name="last_name"
            label={t('lastName')}
            labelStyles={labelStyles}
          />

          <AppPhoneInput
            name="phoneData"
            label={t('phone')}
            labelStyles={labelStyles}
          />

          <AppFormField
            placeholder="0000000000"
            name="national_id"
            label={t('nationalId')}
            labelStyles={labelStyles}
            keyboardType="numeric"
            maxLength={10}
          />

          <AppSelect
            name="type"
            label={t('type')}
            items={items}
            labelStyles={labelStyles}
          />

          <AppCheckbox name="isAgreedWithTerms" />
          <AppSubmitButton title={t('register')} />
        </AppForm>
        <AppLoginRegisterText
          navigate={handleNavigate}
          text={t('AlreadyHaveAccount')}
          linkText={t('Login')}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(2),

    backgroundColor: colors.white,
  },
});

export default RegisterScreen;
