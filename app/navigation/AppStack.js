import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import AppBottomTab from './AppBottomTab';

import {ListLoaiDichVuScreen} from '@app/screen/loaidichvu';
import { SignInScreen } from '@app/screen/account';
import { AddCustomer,DetailCustomer,ListCustomer,AdjournTicket } from '@app/screen/customer';
import {Main_Ticket} from '@app/screen/ticket';

const AppStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
      <Stack.Screen name ="Login" component={SignInScreen} />
      <Stack.Screen name="HomeScreen" component={AppBottomTab}  />
      <Stack.Screen name="ListLoaiDichVuScreen" component={ListLoaiDichVuScreen} />
      <Stack.Screen name = "ThemKhachHang" component={AddCustomer}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "DanhSachKhachHang" component={ListCustomer}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "ChiTietKhachHang" component={DetailCustomer}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "GiaHanVe" component={AdjournTicket}  screenOptions={{headerShown: true}} />
      <Stack.Screen name = "QuanLyGiaVe" component={Main_Ticket}  screenOptions={{headerShown: true}} />
    </Stack.Navigator>
  );
};

export default AppStack;
