import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import AppBottomTab from './AppBottomTab';

import {ListLoaiDichVuScreen} from '@app/screen/loaidichvu';
import { SignInScreen } from '@app/screen/account';
import { AddCustomer } from '@app/screen/customer';

const AppStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
      <Stack.Screen name ="Login" component={SignInScreen} />
      <Stack.Screen name="HomeScreen" component={AppBottomTab}  />
      <Stack.Screen name="ListLoaiDichVuScreen" component={ListLoaiDichVuScreen} />
      <Stack.Screen name = "ThemKhachHang" component={AddCustomer}  screenOptions={{headerShown: true}} />
    </Stack.Navigator>
  );
};

export default AppStack;
