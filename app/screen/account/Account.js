import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image, Pressable, Button, SafeAreaView } from 'react-native';
import { useEffect, useCallback } from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DatePicker from 'react-native-date-picker'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '@app/redux/global/Actions';
import { useFocusEffect } from '@react-navigation/native';
import { setUser } from './../../redux/global/Actions';
import Modal from "react-native-modal";
import { ImagePickerModal } from './Modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';

export default Account = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dataUser,setDataUser] =  useState(null)
    const user = useSelector((state)=> state.global.userInfo)
    const [error, setError] = useState('');
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
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      };
      launchCamera(options, setPickerResponse);
    }, []);


    useEffect(()=>{
      pickerResponse?.assets  && RNFS.readFile(pickerResponse.assets[0].uri, 'base64').then(res => {
        console.log(res)
        setDataUser(pre => ({...pre,code : res}))
      });
    },[pickerResponse])

    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
    console.log(uri)
    useEffect(()=>{
      setDataUser(user)
    },[])

    const btnOk = async ()=>{
      if(dataUser.fullName == "" || dataUser.fullName == null){
        setError("vui lòng nhập họ và tên" )
        return;
      }  
      if(dataUser.address =="" || dataUser.address ==null){
        setError("vui lòng nhập địa chỉ")
        return;
      }    
      if(dataUser.numberPhone =="" || dataUser.numberPhone ==null){
        setError("vui lòng nhập số điện thoại")
        return;
      }
      setError("")

      const rs = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Users/${dataUser.id}`,dataUser)
      if(rs){
        dispatch(actions.setUser(rs));
        navigation.goBack()

      }
    }
console.log(user);
  return (

    <SafeAreaView style={{paddingVertical:28,flex:1}} >
      <Header
        title="Xem sửa thông tin cá nhân"
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
    <View syle={styles.container}>
      <ScrollView style={{ paddingVertical: 16 , paddingHorizontal:10}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.containerProfile}>
          <Image source={{uri: (dataUser?.code !="string" ? dataUser?.code  : "https://cdn.chanhtuoi.com/uploads/2022/01/hinh-avatar-nam-deo-kinh.jpg")}} style={styles.imageProfile}></Image>
          <Icon name="camera" style={styles.iconCam} size={30} onPress={()=>{setVisible(true)}}></Icon>
          <Text style={{fontSize: 25, color: Colors.text, paddingTop: 10}}>{dataUser?.fullName}</Text>
        </View>
        <Text style={{color: Colors.text, fontSize: Fonts.size.medium_bold,marginTop:10}}>{'Tài khoản'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholder={''}
            editable={false}
            value = {dataUser?.userName}
          />
        </View>  
        <Text style={{color: Colors.text, fontSize: Fonts.size.medium_bold,marginTop:10}}>{'Tên người dùng'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholder={'nhập tên người dùng'}
             value = {dataUser?.fullName}
            // autoFocus={focus=="nameCustomer"}
            onChangeText = {(text)=> setDataUser(pre=>({...pre,fullName:text}))}
          />
        </View>        
        <Text style={{color: Colors.text, fontSize: Fonts.size.medium_bold,marginTop:10}}>{'Địa chỉ'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholder={'nhập địa chỉ'}
            value = {dataUser?.address}
            // autoFocus={focus=="nameCustomer"}
            onChangeText = {(text)=> setDataUser(pre=>({...pre,address:text}))}
          />
        </View>        
        <Text style={{color: Colors.text, fontSize: Fonts.size.medium_bold,marginTop:10}}>{'Số điện thoại '}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholder={'nhập số điện thoại'}
            value = {dataUser?.numberPhone}
            // autoFocus={focus=="nameCustomer"}
            onChangeText = {(text)=> setDataUser(pre=>({...pre,numberPhone:text}))}
          />
        </View>
        {/* <Pressable  onPress={() => setOpen(true)} style={styles.btnPickDate} >
        <Text style={{textAlign:'center',padding:10}}>
        Chọn ngày sinh
        </Text>
        </Pressable>
        <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}
        <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>

          <TDButtonPrimary title={'Xác nhận'} contentStyle={{marginTop: 32}} onPress={btnOk}/>

      </ScrollView>
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
    </View>
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bluish,
    paddingHorizontal:10,
    paddingVertical:35
  },
  containerProfile: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageProfile: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 'auto',
  },
  iconCam: {
    position: 'absolute',
    top: 76,
    left: '60%',
  },
  btnPickDate:{
    backgroundColor:"#EEC591",
    width:150,
    textAlignVertical:'center',
    borderRadius:40
  }
});
