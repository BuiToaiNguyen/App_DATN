
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import React, {useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from '../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import {CheckBox} from 'react-native-elements';
import {set} from 'lodash';
import {ImagePickerModal} from './../account/Modal';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const EditAccount = ({route}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.global.userInfo);
  const [cbAdmin, setCbAdmin] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const params = route.params;
  const [dataUser, setDataUser] = useState(null);
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
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

  useFocusEffect(
    React.useCallback(() => {
      console.log(params.userName);
      const func = async () => {
        const user = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/Users/user?userName=${params.userName}`);
        console.log(user.data)
        setDataUser(user.data);
        if (user?.data?.permission == 0) {
          setCbAdmin(false);
        } else {
          setCbAdmin(true);
        }
      };
      func();
    }, [params]),
  );
  useEffect(() => {
    if (pickerResponse?.assets) {
      ImageResizer.createResizedImage(pickerResponse.assets[0].uri, 200, 200, 'JPEG', 100, 0).then(response => {
        RNFS.readFile(response.uri, 'base64')
          .then(res => {
            setDataUser(pre => ({...pre, code: res}));
            setVisible(false);
          })
          .catch(err => {
            console.log('có lỗi');
          });
      });
    }
  }, [pickerResponse]);
  const handleOk = async () => {
    console.log(dataUser);
    const rs = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Users/${dataUser?.id}`, dataUser);
    if (rs) {
      alert('sửa thành công');
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (cbAdmin) {
      setDataUser(pre => ({...pre, permission: 1}));
    } else {
      setDataUser(pre => ({...pre, permission: 0}));
    }
  }, [cbAdmin]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.bluish}}>
      <Header
        title="Sửa tài khoản"
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
      {dataUser && (
        <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Nhập tài khoản *'}</Text>
          <View style={styles.textinputContent}>
            <TextInput
              multiline={false}
              style={styles.textinput}
              placeholderTextColor={Colors.gray60}
              placeholder={'nhập tài khoản'}
              value={dataUser?.userName}
              onChangeText={text => setDataUser(pre => ({...pre, userName: text}))}
            />
          </View>
          <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Nhập họ và tên'}</Text>

          <View style={styles.textinputContent}>
            <TextInput
              multiline={false}
              style={styles.textinput}
              placeholderTextColor={Colors.gray60}
              placeholder={'nhập họ tên'}
              value={dataUser?.fullName}
              onChangeText={text => setDataUser(pre => ({...pre, fullName: text}))}
            />
          </View>
          <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Nhập số điện thoại'}</Text>

          <View style={styles.textinputContent}>
            <TextInput
              multiline={false}
              style={styles.textinput}
              placeholderTextColor={Colors.gray60}
              placeholder={'nhập số điện thoại'}
              value={dataUser?.numberPhone}
              onChangeText={text => setDataUser(pre => ({...pre, numberPhone: text}))}
            />
          </View>

          <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Nhập địa chỉ'}</Text>
          <View style={styles.textinputContent}>
            <TextInput
              multiline={false}
              style={styles.textinput}
              placeholderTextColor={Colors.gray60}
              placeholder={'nhập địa chỉ'}
              value={dataUser?.address}
              onChangeText={text => setDataUser(pre => ({...pre, address: text}))}
            />
          </View>
          <CheckBox
            onPress={() => {
              setCbAdmin(pre => !pre);
            }}
            checked={cbAdmin}
            title="quyền admin"
            iconRight
            checkedColor="green"></CheckBox>
          <Pressable
            onPress={() => {
              setVisible(true);
            }}>
            <Text
              style={{backgroundColor: Colors.darkGray, width: 100, fontSize: 21, padding: 5, color: 'white', borderRadius: 15}}>
              {'Chọn ảnh'}
            </Text>
          </Pressable>
          
          <Image
            style={{width: 50, height: 50}}
            source={{
              uri:
                dataUser?.code != 'null'
                  ? `data:image/jpg;base64,${dataUser?.code}`
                  : 'https://cdn.chanhtuoi.com/uploads/2022/01/hinh-avatar-nam-deo-kinh.jpg',
            }}></Image>

          <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>
          <TDButtonPrimary loading={isLoading} title={'Cập nhật'} contentStyle={{marginTop: 32}} onPress={handleOk} />
        </ScrollView>
      )}
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
    marginTop: 10,
  },
  textinput: {
    ...Fonts.style.large_regular,
    flex: 1,
    paddingVertical: 10,
  },
  btnPickDate: {
    backgroundColor: '#EEC591',
    width: 150,
    textAlignVertical: 'center',
    borderRadius: 40,
    marginTop: 10,
  },
});

export default EditAccount;
