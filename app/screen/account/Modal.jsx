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
} from 'react-native';
import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '@app/redux/global/Actions';
import {useFocusEffect} from '@react-navigation/native';
import {setUser} from './../../redux/global/Actions';
import Modal from 'react-native-modal';

export function ImagePickerModal({isVisible, onClose, onImageLibraryPress, onCameraPress}) {
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose} onBackdropPress={onClose} style={{}}>
        <SafeAreaView style={{flexDirection: 'row', justifyContent: 'space-around',position:'absolute', backgroundColor:'white',bottom:0,width:'100%',borderRadius:50}}>
          <Pressable style={{backgroundColor: 'white'}} onPress={onImageLibraryPress}>
            <Image style={{}} source={Images.icons.apple} />
            <Text style={{}}>Library</Text>
          </Pressable>
          <Pressable style={{}} onPress={onCameraPress}>
            <Image style={{}} source={Images.icons.google} />
            <Text style={{}}>Camera</Text>
          </Pressable>
        </SafeAreaView>
    </Modal>
  );
}
