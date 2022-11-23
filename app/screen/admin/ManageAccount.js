import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '@app/redux/global/Actions';
import {useFocusEffect} from '@react-navigation/native';
import {setUser} from '../../redux/global/Actions';
import Modal from 'react-native-modal';
import {ImagePickerModal} from './Modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
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
import GLOBAL_API from '../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';



const Item =()=>{

    return(
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <View style={styles.imageItem}>

            <Image source ={{uri:"https://haycafe.vn/wp-content/uploads/2021/12/Anh-avatar-nam-cool-ngau-dep.jpg"}} style={{width:50,height:50}}></Image>
            </View>
            <View >
                <Text style={{color:'black',fontSize:20,textAlign:"center"}}>Tài khoản</Text>
            </View>
            <View style={styles.buttonGroupItem}>
                <Pressable>
                    <Icon name='exclamation' size={31} />
                </Pressable>                
                <Pressable>
                    <Icon name='times' size={31} />
                </Pressable>

            </View>
            

        </View>
    )

}

const ManageAccount = () => {
  return (
    <View style={{flex: 1}}>
      <Header
        title="Thêm người dùng"
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
         <ScrollView style={{}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <Text style={{fontSize: 25, marginLeft: 10}}>Danh sách khách hàng</Text>
            <Item/>

        </ScrollView>




    </View>
  );
};
const styles=StyleSheet.create({
    imageItem:{
        width:50,
        height:50,
    },
    buttonGroupItem:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})
export default ManageAccount;
