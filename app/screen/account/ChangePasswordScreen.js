/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView,ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState,useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {CheckBox} from 'react-native-elements';
import GLOBAL_API from '@app/screen/services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '@app/redux/global/Actions';
import {Header} from '@app/components';
import { useFocusEffect } from '@react-navigation/native';


const SignInEmailScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.global.userInfo)
  const navigation = useNavigation();
  const [error,setError] = useState(null)
  const [password,setPassword] = useState(null)
  const [newPassword,setNewPassword] = useState(null)
  const [newPassword2,setNewPassword2] = useState(null)

const btnOk= async()=>{
  console.log(user);
  if(password==null|| password=="")
  {
    setError("vui lòng nhập mật khẫu cũ")
    return;
  }
  if(password!= user?.passWord){
    setError("vui lòng nhập đúng mật khẩu cũ")
  }
  if(newPassword==null|| newPassword=="")
  {
    setError("vui lòng nhập mật khẫu mới")
    return;
  }  
  if(newPassword2==null|| newPassword2=="")
  {
    setError("vui lòng nhập lại mật khẫu mới")
    return;
  }
  if(newPassword!=newPassword2){
    setError("mật khẩu mới không trùng khớp")
    return;
  }
  setError("")

  
  const rs = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Users/${user?.id}`,{...user,passWord:newPassword})
  if(rs){
    const jsonValue = JSON.stringify({userName: user.userName, password: newPassword});
    await AsyncStorage.setItem('@user', jsonValue);
    dispatch(actions.setUser(rs.data));
    navigation.goBack()
  }

}
  useFocusEffect(useCallback(()=>{
  

  },[]))
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        title="Thay đổi mật khẩu"
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
        <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: 24, lineHeight: 32}}>Tạo mật khẩu mới</Text>
        </View>
        <View style={{marginTop: 16}}>
          <TDTextInputAccount title={'Nhập mật khẩu'} placeholder={''} showEye={true} style={{fontSize:25}}  onChangeText={(text)=>setPassword(text)}/>
          <TDTextInputAccount title={'Nhập mật khẩu mới'} placeholder={''} showEye={true} style={{fontSize:25}} onChangeText={(text)=>setNewPassword(text)}/>
          <TDTextInputAccount title={'Nhập lại mật khẩu mới'} placeholder={''} showEye={true} style={{fontSize:25}}   onChangeText={(text)=>setNewPassword2(text)} />
          <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>
          <TDButtonPrimary title={'Xác nhận'} contentStyle={{marginTop: 32}} onPress={btnOk}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInEmailScreen;

const styles = StyleSheet.create({});
