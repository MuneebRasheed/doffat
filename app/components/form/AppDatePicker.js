import {Fragment, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useFormikContext} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import {formatDate} from '../../helpers/utilityFunctions';
import colors from '../../config/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const AppDatePicker = ({name, label, labelStyles, extraStylesForInput}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {setFieldValue, values, errors, touched} = useFormikContext();

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || values[name];
    let tempDate = new Date(currentDate);
    setShowDatePicker(false);
    setFieldValue(name, tempDate);
  };

  return (
    <Fragment>
      {label && <AppText style={labelStyles}>{label}</AppText>}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          testID="dateTimePicker"
          value={values[name]}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={[styles.container, extraStylesForInput]}>
          <AppText style={styles.textInputStyle}>
            {formatDate(values[name])}
          </AppText>
          <FeatherIcon style={styles.iconStyle} name="calendar" size={25} />
        </View>
      </TouchableOpacity>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: responsiveScreenHeight(1),
    borderColor: '#E5E5E5',
    borderWidth: responsiveScreenWidth(0.5),
    flexDirection: 'row',
    height: responsiveScreenHeight(5.5),
    paddingHorizontal: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
    alignItems: 'center',
  },
  textInputContainer: {
    position: 'relative',
  },
  textInputStyle: {
    flex: 1,
    color: colors.dark,
  },
  iconStyle: {
    position: 'absolute',
    top: responsiveScreenHeight(1),
    right: responsiveScreenHeight(2),
  },
});

export default AppDatePicker;
