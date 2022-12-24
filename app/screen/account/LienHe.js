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
import {ImagePickerModal} from './Modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
// import Clipboard from '@react-native-community/clipboard'
import {Linking} from 'react-native'

const LienHe = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        title="Liên hệ Admin"
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
      <ScrollView
        style={{paddingVertical: 16, paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

        <View style={{flexDirection:'row',marginBottom:20}}>
            <Text style={{color:'black', fontSize:24,marginRight:5 }}>{"Số điện thoại:"}</Text>
            <Text style={{color:'black', fontSize:26 }}>{"0828803754"}</Text>
            <Pressable>
                <Icon name="phone" size={30} style={{marginLeft:10,color:'green'}} onPress={()=>{Linking.openURL(`tel:0828803754`)
}}/>
            </Pressable>
        </View>        
        <View style={{flexDirection:'row',marginBottom:20}}>
            <Text style={{color:'black', fontSize:24,marginRight:5 }}>{"email:"}</Text>
            <Text style={{color:'black', fontSize:22 }}>{"toainguyenbui@gmail.com"}</Text>
        </View >
            <Text style={{color:'black', fontSize:23,marginBottom:20 }}>{"Địa chỉ:Tân Dân, JSC"}</Text>


        </ScrollView>
    </View>
  );
};

export default LienHe;
