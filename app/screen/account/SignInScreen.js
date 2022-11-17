/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView,ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [showEye, setShowEye] = useState(false);
  const [loading,setLoading] = useState(true)
  

  useEffect(() => {

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user')
        console.log(jsonValue)
         const dataUser = jsonValue != null ? JSON.parse(jsonValue) : null;

         if(dataUser?.userName !=null && dataUser?.password !=null){

          const rs = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/Users/Login`, {userName : dataUser?.userName , password:dataUser?.password});
          dispatch(actions.setUser(rs.data));
          navigation.navigate('HomeScreen');
        }
      } catch(e) {
      console.log(e)      }
    }
    getData()
  }, []);

  const Login = async () => {
    const rs = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/Users/Login`, {userName, password});
    console.log(userName, password);
    if (rs.data) {
      if(checked){
        try {
          const jsonValue = JSON.stringify({userName,password})
          await AsyncStorage.setItem('@user', jsonValue)
        } catch (e) {

        }

      }
      
      dispatch(actions.setUser(rs.data));

      navigation.navigate('HomeScreen');
    } else {
      alert('tài khoản mật khẩu không đúng');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary}}>




      <View style={{flex: 1 / 3, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 24, lineHeight: 32}}>Hi, Xin Mời Đăng Nhập !</Text>
      </View>

      <ScrollView
        style={{backgroundColor: Colors.white, flex: 2 / 3, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 16}}>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium}}>{'Tài khoản'}</Text>

        <View style={styles.textinputContent}>
          <TextInput
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tài khoản'}
            value={userName}
            onChangeText={value => setUserName(value)}
          />
        </View>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium}}>{'Tài khoản'}</Text>

        <View style={styles.textinputContent}>
          <TextInput
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tài khoản'}
            value={password}
            onChangeText={value => setPassword(value)}
          />
          {
            <FontAwesome
              name={showEye ? 'eye' : 'eye-slash'}
              color={'#787C7E'}
              size={20}
              style={styles.textinputIcon}
              onPress={() => setShowEye(pre => !pre)}
            />
          }
        </View>
        <CheckBox title={'nhớ mật khẩu'} checked={checked} onPress={() => setChecked(pre => !pre)} />
        <TDButtonPrimary title={'Đăng nhập'} contentStyle={{marginTop: 32}} onPress={Login} />
        <TDDividerWithTitle title={'Or continue with'} contentStyle={{marginTop: 32, paddingHorizontal: 20}} />

        <View style={{marginTop: 32}}>
          <TDButtonSecondary title={'Continue with Google'} image={Images.icons.google} onPress={() => {}} />
          <TDButtonSecondary
            title={'Continue with Apple'}
            image={Images.icons.apple}
            contentStyle={{marginTop: 16}}
            onPress={() => {}}
          />
        </View>
        <View
          style={{
            paddingTop: 50,
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#6C6C6C', fontSize: 16}}>{'Don’t have an account? '}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={{color: Colors.primary, fontSize: 16, fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  content: {marginTop: 16},
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
});
