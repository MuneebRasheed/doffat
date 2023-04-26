import {useState} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {addLoans} from '../../api/loans';
import AppScrollView from '../../components/AppScrollView';

import LoanAppliedSucccessScreen from '../loan/LoanAppliedSuccessScreen';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppForm from '../../components/form/AppForm';
import AppFormField from '../../components/form/AppFormField';
import AppDatePicker from '../../components/form/AppDatePicker';
import AppSlider from '../../components/form/AppSlider';
import AppDocumentPicker from '../../components/form/AppDocumentPicker';
import AppButton from '../../components/AppButton';
import AppSubmitButton from '../../components/form/AppSubmitButton';
import AppHeader from '../../components/AppHeader';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import Card from '../../components/cards/Card';
import colors from '../../config/colors';
import routes from '../../routes';

const labelStyles = {
  marginTop: responsiveScreenHeight(0.4),
};

const HorizontalSeperator = ({extraStyles}) => {
  return <View style={[styles.horizontalSeperatorStyles, extraStyles]} />;
};

const ApplyLoanScreen = ({navigation}) => {
  const showToast = () => {
    ToastAndroid.show('Error in uploading sama_statement', ToastAndroid.SHORT);
  };

  const {token} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [repaymentValue, setRepaymentValue] = useState(1);
  const [showOtherFields, setShowOtherFields] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const {TAB_ACCOUNT_NAVIGATOR} = routes;
  const {t} = useTranslation();

  const handleSubmit = async values => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    try {
      console.log('SUBMITTED VALUES', values);
      // const resp = await addLoans(values, headers);
      setLoading(false);
      console.log(resp);
    } catch (err) {
      setLoading(false);
      console.log('ERROR WHILE ADDING LOAN', err.response.data);
    }
  };

  if (isRequestSuccessful) {
    return <LoanAppliedSucccessScreen />;
  }

  return (
    <AppScreen style={styles.container}>
      <AppHeader
        onPress={() => {
          if (!showOtherFields) {
            navigation.navigate(TAB_ACCOUNT_NAVIGATOR);
          } else {
            setShowOtherFields(false);
          }
        }}
        headerText="Apply"
      />
      <AppForm
        initialValues={{
          amount: '',
          repaymentPeriod: 1,
          start_date: new Date(),

          salary: '',
          commitment_amount: '',
          sama_statement: '',
          bank_statement: '',
          ssn_certificate: '',
          lease_copy: '',
        }}
        onSubmit={handleSubmit}>
        {!showOtherFields && (
          <View style={{flex: 1}}>
            <AppScrollView>
              <Card extraStyles={styles.cardStyles}>
                <AppFormField
                  placeholder="Enter amount"
                  name="amount"
                  label={t('borrowedAmount')}
                  labelStyles={{...labelStyles, fontWeight: '700'}}
                  keyboardType="numeric"
                />

                <HorizontalSeperator />

                <>
                  <AppText style={styles.repaymentHeading}>
                    {t('repaymentPeriod')}
                  </AppText>
                  <AppText style={styles.repaymentDuration}>
                    {repaymentValue} months
                  </AppText>
                  <AppSlider
                    minimumValue={1}
                    maximumValue={12}
                    step={1}
                    name="repaymentPeriod"
                    setRepaymentValue={setRepaymentValue}
                  />

                  <View style={styles.repaymentPeriodTextContainer}>
                    <AppText style={styles.repaymentPeriodText}>
                      3 months
                    </AppText>
                    <AppText style={styles.repaymentPeriodText}>
                      6 months
                    </AppText>
                  </View>
                </>

                <View>
                  <HorizontalSeperator
                    extraStyles={{marginTop: 15, marginBottom: 10}}
                  />

                  <View>
                    <AppText style={styles.startDateHeading}>
                      {t('startData')}
                    </AppText>
                    <AppDatePicker name="start_date" />
                  </View>

                  <HorizontalSeperator />

                  <View style={styles.addMarginTop}>
                    <View style={styles.addMarginBottom}>
                      <AppText style={styles.paymentTextPrimary}>
                        {t('monthlyPayment')}
                      </AppText>
                      <AppText style={styles.paymentTextSecondary}>
                        SAR 2,6000
                      </AppText>
                    </View>
                    <View>
                      <AppText style={styles.paymentTextPrimary}>
                        {' '}
                        {t('fees')}
                      </AppText>
                      <AppText style={styles.paymentTextSecondary}>
                        SAR 2400
                      </AppText>
                    </View>
                  </View>
                </View>
              </Card>
            </AppScrollView>
            <AppButton
              onPress={() => setShowOtherFields(true)}
              title={t('continue')}
            />
          </View>
        )}

        {showOtherFields && (
          <View style={{flex: 1}}>
            <AppScrollView>
              <AppFormField
                placeholder="No amount enter"
                name="salary"
                label={t('salaryAmount')}
                labelStyles={labelStyles}
              />
              <AppFormField
                placeholder="No commitment amount enter"
                name="commitment_amount"
                label={t('commitmentAmount')}
                labelStyles={labelStyles}
              />

              <AppDocumentPicker
                name="sama_statement"
                label={t('samaStatement')}
              />
              <AppDocumentPicker
                name="bank_statement"
                label={t('bankStatement')}
              />

              <AppDocumentPicker
                name="ssn_certificate"
                label={t('socialSecurityCertificate')}
              />
              <AppDocumentPicker name="lease_copy" label={t('leaseCopy')} />
            </AppScrollView>
            <AppSubmitButton title={t('finish')} isLoading={loading} />
            <AppButton
              title="Finish"
              // onPress={() => {
              //   setIsRequestSuccessful(true);
              //   setShowOtherFields(false);
              // }}
              onPress={showToast}
            />
          </View>
        )}
      </AppForm>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScreenHeight(3),
    paddingTop: responsiveScreenHeight(2),
    backgroundColor: colors.white,
  },
  cardStyles: {
    padding: responsiveScreenHeight(3),
  },
  trackStyles: {
    padding: responsiveScreenHeight(1),
    width: responsiveScreenWidth(1),
  },
  startDateHeading: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(2.2),
    fontWeight: '700',
    marginBottom: responsiveScreenHeight(1),
  },
  repaymentHeading: {
    fontWeight: '700',
    color: colors.secondary,
  },
  repaymentDuration: {
    fontSize: responsiveScreenFontSize(3),
    color: colors.primary,
    fontWeight: '700',
    marginVertical: responsiveScreenHeight(1),
  },
  repaymentPeriodTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repaymentPeriodText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(1.9),
  },
  addMarginTop: {
    marginTop: responsiveScreenHeight(1),
  },
  paymentTextPrimary: {
    fontSize: responsiveScreenFontSize(1.9),
    fontWeight: '700',
    marginBottom: responsiveScreenHeight(0),
  },
  paymentTextSecondary: {
    color: colors.primary,
    fontSize: responsiveScreenFontSize(3),
    fontWeight: '700',
  },
  addMarginBottom: {
    marginBottom: responsiveScreenHeight(0.9),
  },
  horizontalSeperatorStyles: {
    borderBottomWidth: responsiveScreenHeight(0.2),
    borderBottomColor: colors.border,
    marginTop: responsiveScreenHeight(0.5),
    marginBottom: responsiveScreenHeight(2),
  },
});

export default ApplyLoanScreen;
