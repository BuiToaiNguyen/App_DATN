import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '@app/redux/global/Actions';
import {useFocusEffect} from '@react-navigation/native';
import {setUser} from '../../redux/global/Actions';
import Modal from 'react-native-modal';
import {ImagePickerModal} from './../account/Modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import React, {useState} from 'react';
import ImageResizer from '@bam.tech/react-native-image-resizer';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Pressable,
  Button,
  SafeAreaView,
} from 'react-native';
import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from '../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';

const AddUser = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.global.userInfo);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [numberPhone, setNumberPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  const [image,setImage] = useState(null)
  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: true,
    };
    launchCamera(options, setPickerResponse);
  }, []);
  useEffect(() => {

    if (pickerResponse?.assets) {
      ImageResizer.createResizedImage(pickerResponse.assets[0].uri, 200, 200, 'JPEG', 100, 0).then(response => {
        RNFS.readFile(response.uri, 'base64')
          .then(res => {
            setImage(res);
            setVisible(false);
          })
          .catch(err => {
            console.log('có lỗi');
          });
      });
    }
  }, [pickerResponse]);

  const btnAdd = async () => {
    if (userName == null || userName == '') {
      setError('vui lòng nhập tài khoản');
      return;
    }
    if (password == null || password == '') {
      setError('vui lòng nhập mật khẩu');
      return;
    }
    if (passwordConfirm == null || passwordConfirm == '') {
      setError('vui lòng nhập lại tài khoản');
      return;
    }

    if (!/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(userName)) {
      setError('vui lòng nhập đúng định dạng tài khoản');
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError('mật khẩu phải 8 có kí tự, có hoa và thường');
      return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordConfirm)) {
      setError('mật khẩu nhập lại phải 8 có kí tự, có hoa và thường');
      return;
    }
    if (password != passwordConfirm) {
      setError('vui lòng nhập lại không trùng khớp');
    }

    const res = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/Users/user?userName=${userName}`, userName);
    console.log(res);
    if (res.data) {
      setError('Tài khoản đã tồn tại');
      return;
    }
    setError('');

    const data = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/users`, {
      userName,
      passWord: password,
      numberPhone,
      address,
      fullName,
      code:image
    });
    if (data) {
      alert('thêm người dùng thành công');
      navigation.goBack();
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title="Thêm người dùng"
        isStack={true}
        RightComponent={() => (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
            }}
            onPress={() => {}}></TouchableOpacity>
        )}
      />
      <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Text style={{color: Colors.black, fontSize: 18}}>{'Nhập tài khoản *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tài khoản'}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
                
        </View>
        <Text style={{color: Colors.black, fontSize: 18}}>{'Nhập mật khẩu *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            secureTextEntry={true}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập mật khẩu'}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <Text style={{color: Colors.black, fontSize: 18}}>{'Nhập lại mật khẩu *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            secureTextEntry={true}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập lại mật khẩu'}
            value={passwordConfirm}
            onChangeText={text => setPasswordConfirm(text)}
          />
        </View>
  
        <Text style={{color: Colors.black, fontSize: 18}}>{'Nhập họ tên'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập họ tên'}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>
        <Text style={{color: Colors.black, fontSize: 18}}>{'Nhập số điện thoại'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập số điện thoại'}
            value={numberPhone}
            onChangeText={text => setNumberPhone(text)}
          />
        </View> 
        <Text style={{color: Colors.black, fontSize: 18}}>{'Nhập địa chỉ'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập địa chỉ'}
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>  
        <Pressable
            onPress={() => {
              setVisible(true);
            }}>
            <Text
              style={{backgroundColor: Colors.darkGray, width: 100, fontSize: 21, padding: 5, color: 'white', borderRadius: 15}}>
              {'Chọn ảnh'}
            </Text>
          </Pressable>
          {image != null &&
          
          <Image
            style={{width: 50, height: 50}}
            source={{
              uri:
                  `data:image/jpg;base64,${image}`
            }}></Image>
          }
        <Text style={{color: Colors.error, fontSize: 18}}>{error}</Text>
        <TDButtonPrimary loading={isLoading} title={'Thêm người dùng'} contentStyle={{marginTop: 32, marginBottom:30}} onPress={btnAdd} />
      </ScrollView>
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textinputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    height: 52,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    marginTop: 10
  },
  textinput: {
    ...Fonts.style.large_regular,
    flex: 1,
    paddingVertical: 10
  },
  btnPickDate: {
    backgroundColor: '#EEC591',
    width: 150,
    textAlignVertical: 'center',
    borderRadius: 40,
    marginTop: 10
  },
});
export default AddUser;
