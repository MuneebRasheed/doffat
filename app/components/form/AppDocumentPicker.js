import {Fragment, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import {useFormikContext} from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';

import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

const AppDocumentPicker = ({name, label, labelStyles, extraStylesForInput}) => {
  const showMessage = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const {token} = useSelector(state => state.auth);
  const {errors, touched, setFieldValue} = useFormikContext();
  const [fileName, setFileName] = useState('');

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileResponse = res[0];
      const formData = new FormData();

      formData.append('image', fileResponse);
      formData.append('type', name);

      const result = await fetch(
        'http://178.128.133.180/api/general/upload-image',
        {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const finalResult = await result.json();
      setFieldValue(name, finalResult.data.url);
      setFileName(fileResponse?.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('CANNCEL');
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        showMessage(`Error while uploading ${name}. Please retry!`);
        console.log('ERROR', err.message);
      }
    }
  };

  return (
    <Fragment>
      {label && <AppText style={labelStyles}>{label}</AppText>}

      <TouchableOpacity onPress={pickFile}>
        <View style={[styles.container, extraStylesForInput]}>
          <AppText
            style={[styles.textInputStyle, fileName && {color: colors.dark}]}
            numberOfLines={1}>
            {fileName || 'No file selected'}
          </AppText>
          <FeatherIcon style={styles.iconStyle} name="download" size={25} />
        </View>
      </TouchableOpacity>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  textInputContainer: {
    position: 'relative',
  },
  textInputStyle: {
    flex: 1,
    color: colors.secondary,
  },
  iconStyle: {
    position: 'absolute',
    top: 10,
    right: 10,
    transform: [{rotateX: '180deg'}],
    backgroundColor: colors.light,
  },
});

export default AppDocumentPicker;
