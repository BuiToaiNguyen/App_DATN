import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import AppBottomTab from './AppBottomTab';

import {ListLoaiDichVuScreen} from '@app/screen/loaidichvu';
import { AddCustomer,DetailCustomer,ListCustomer,AdjournTicket } from '@app/screen/customer';
import {Main_Ticket} from '@app/screen/ticket';
import ChupBienSo from '@app/screen/camera/ChupBienSo';
import {SignInScreen, SignInEmailScreen, SignUpScreen, ForgotScreen, ChangePasswordScreen, Account} from '@app/screen/account';

const AppStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
      <Stack.Screen name = "Login" component={SignInScreen} />
      <Stack.Screen name = "HomeScreen" component={AppBottomTab}  />
      <Stack.Screen name = "ListLoaiDichVuScreen" component={ListLoaiDichVuScreen} />
      <Stack.Screen name = "ThemKhachHang" component={AddCustomer}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "DanhSachKhachHang" component={ListCustomer}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "ChiTietKhachHang" component={DetailCustomer}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "GiaHanVe" component={AdjournTicket}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "QuanLyGiaVe" component={Main_Ticket}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "ChupBienSo" component={ChupBienSo}  screenOptions={{headerShown: false}} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignInEmailScreen" component={SignInEmailScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export default AppStack;
