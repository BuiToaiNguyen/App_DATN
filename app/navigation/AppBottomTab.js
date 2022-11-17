/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Colors} from '@app/themes';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();

import {MAIN_HomeScreen, MAIN_SettingScreen} from '../screen/home';
import AccountStack from './AccountStack';

import {TDButtonNavigation} from '../components';
import { Main_Cam } from './../screen/camera/Main_Cam';
import Home from '@app/screen/home/Home';
import { Profile } from '@app/screen/account';

const PlusScreen = () => {
  return null;
};

const AppBottomTab = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: '#FFF',
        tabBarInactiveBackgroundColor: '#FFF',
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#757E83',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '400',
        },
        tabBarStyle: {paddingHorizontal: isTablet ? 100 : 0, backgroundColor: '#FFFFFF'},
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        headerMode={'none'}
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="home"
                size={isTablet ? 24 : 22}
                color={focused ? Colors.primary : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CameraScreen"
        component={Main_Cam}
        options={{
          headerShown: false,
          tabBarLabel: 'Quét',
          tabBarBadge: null,
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="camera"
                size={isTablet ? 24 : 22}
                color={focused ? Colors.primary : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />

     
      <Tab.Screen
        name="SettingScreen"
        component={MAIN_SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="cogs"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#757E83'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
       <Tab.Screen
        name="NhacNhoScreen"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Tài Khoản',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="user"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#757E83'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTab;
