import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Pressable, Image} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from '@app/screen/services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import DatePicker from 'react-native-date-picker';
import {getAge} from '@app/utils/FuncHelper';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImagePickerModal} from './../account/Modal';
import RNFS from 'react-native-fs';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const AddCustomer = () => {
  const {id} = useSelector(state => state.global.userInfo);
  const navigation = useNavigation();
  const [nameCustomer, setNameCustomer] = useState('');
  const [ageCustomer, setAgeCustomer] = useState('');
  const [addressCustomer, setAddressCustomer] = useState(null);
  const [numPhoneCustomer, setNumPhoneCustomer] = useState('');
  const [nameCar, setNameCar] = useState(null);
  const [licensePlate, setLincesePlate] = useState('');
  const [error, setError] = useState('');
  const [focus, setFocus] = useState('nameCustomer');

  const [dateCustomer, setDateCustomer] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
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
      ImageResizer.createResizedImage(pickerResponse.assets[0].uri, 100, 300, 'JPEG', 100, 0).then(response => {
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
  strRegex =
    /(^[0-9]{2}-?[0-9A-Z]{1,3}$)|(^[A-Z0-9]{2,5}$)|(^[0-9]{2,3}-[0,9]{2}$)|(^[A-Z0-9]{2,3}-?[0-9]{4,5}$)|(^[A-Z]{2}-?[0-9]{0,4}$)|(^[0-9]{2}-?[A-Z0-9]{2,3}-?[A-Z0-9]{2,3}-?[0-9]{2}$)|(^[A-Z]{2}-?[0-9]{2}-?[0-9]{2}$)|(^[0-9]{3}-?[A-Z0-9]{2}$)$/;
  const btnAdd = async () => {
    if (nameCustomer == null || nameCustomer == '') {
      setError('vui lòng nhập tên khách hàng');
      setFocus('nameCustomer');
      return;
    }
    if (numPhoneCustomer == null || numPhoneCustomer == '') {
      setError('vui lòng nhập số điện thoại');
      setFocus('numPhoneCustomer');
      return;
    }
    if (getAge(dateCustomer) < 18) {
      setError('vui lòng chọn ngày sinh');
    }
    if (licensePlate == null || licensePlate == ' ') {
      setError('vui lòng nhập biển số');
      setFocus('licensePlate');
      return;
    } else {
      var lpOk = strRegex.test(licensePlate);
      if (!lpOk) {
        setError('vui lòng nhập biển số đúng định dạng vd: 28-Y1-9999');
        setFocus('licensePlate');
        return;
      }
    }

    setError('');
    const customer = {
      nameCustomer,
      licensePlate,
      nameCar,
      numberPhone: numPhoneCustomer,
      idUser: id,
      address: addressCustomer,
      age: ageCustomer,
      code: image,
    };
    console.log(customer);
    setIsLoading(true);
    try {
      const {data} = await GLOBAL_API.requestPOST(REACT_APP_URL + 'api/Customers', customer);
      console.log(data);
      if (data != null) {
        alert('Thêm khách hàng thành công !');
        navigation.goBack();
      } else {
        alert('thêm thất bại');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.bluish}}>
      <Header
        title="Thêm Khách Hàng"
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
        <Text style={{color: Colors.black, marginTop: 0, fontSize: Fonts.size.regular}}>{'Tên Khách Hàng *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên khách hàng'}
            value={nameCustomer}
            autoFocus={focus == 'nameCustomer'}
            onChangeText={text => setNameCustomer(text)}
          />
        </View>
        <Text style={{color: Colors.black, marginTop: 0, fontSize: Fonts.size.regular}}>{'Tuổi Khách Hàng'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tuổi khách hàng'}
            value={ageCustomer}
            onChangeText={text => setAgeCustomer(text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={{color: Colors.black, marginTop: 0, fontSize: Fonts.size.regular}}>{'Địa Chỉ'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập địa chỉ khách hàng'}
            value={addressCustomer}
            onChangeText={text => setAddressCustomer(text)}
          />
        </View>
        <Text style={{color: Colors.black, marginTop: 0, fontSize: Fonts.size.regular}}>{'Số Điện Thoại *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập số điện thoại *'}
            keyboardType="numeric"
            value={numPhoneCustomer}
            autoFocus={focus == 'numPhoneCustomer'}
            onChangeText={text => setNumPhoneCustomer(text)}
          />
        </View>
        <Text style={{color: Colors.black, marginTop: 0, fontSize: Fonts.size.regular}}>{'Tên Xe'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên xe '}
            value={nameCar}
            onChangeText={text => setNameCar(text)}
          />
        </View>
        <Text style={{color: Colors.black, marginTop: 0, fontSize: Fonts.size.regular}}>{'Biển Số VD : 28-Y1-0308'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'VD : 28-Y1-0308'}
            autoFocus={focus == 'licensePlate'}
            value={licensePlate}
            onChangeText={text => setLincesePlate(text)}
          />
        </View>
        {/* <Pressable onPress={() => setOpen(true)} style={styles.btnPickDate}>
          <Text style={{textAlign: 'center', padding: 10}}>Chọn ngày sinh</Text>
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={dateCustomer}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDateCustomer(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}
        <Pressable
          onPress={() => {
            setVisible(true);
          }}>
          <Text
            style={{backgroundColor: Colors.darkGray, width: 100, fontSize: 18, padding: 5, color: 'white', borderRadius: 15}}>
            {'Chọn ảnh'}
          </Text>
        </Pressable>
        {image != null && (
          <Image
            style={{width: 50, height: 50, marginTop: 10, marginLeft: 10}}
            source={{
              uri: `data:image/jpg;base64,${image}`,
            }}></Image>
        )}
        <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>

        <TDButtonPrimary
          loading={isLoading}
          title={'Thêm Khách Hàng'}
          contentStyle={{marginTop: 32, marginBottom: 30}}
          onPress={btnAdd}
        />
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
export default AddCustomer;
