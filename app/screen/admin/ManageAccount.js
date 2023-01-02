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
  ActivityIndicator,
} from 'react-native';
import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from '../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import Dialog from "react-native-dialog";

const Item = ({item, stt,setIdDelete,setIsDelete}) => {
  const navigation = useNavigation();


  const editCustomer = id => {
    navigation.navigate("EditAccount", {userName: id})
  };

  return (
    <>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      {/* <View style={styles.imageItem}>
        <Image
          source={{uri: 'https://haycafe.vn/wp-content/uploads/2021/12/Anh-avatar-nam-cool-ngau-dep.jpg'}}
          style={{width: 50, height: 50}}></Image>
      </View> */}
      <Text style={{marginLeft: 10, fontSize: 20,color:"white"}}> {stt + 1}</Text>
      <View style={{width: '60%'}}>
        <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>{item?.userName}</Text>
      </View>
      <View style={styles.buttonGroupItem}>
        <Pressable  style={{color:"white"}}>
          <Icon name="edit" size={31} onPress={()=>editCustomer(item?.userName)}  style={{color:"yellow"}}/>
        </Pressable>
        <Pressable  style={{color:"white"}}>
          <Icon  style={{color:"red"}} name="times" size={31} onPress={()=>{
            setIsDelete(true)
            setIdDelete(item?.id)
          }}  />
        </Pressable>
      </View>
    </View>
    <View style={{height:1, backgroundColor:"black"}}></View>
    </>
  );
};

const ManageAccount = () => {
  const [search, setSearch] = useState('');
  const updateSearch = search => {
    setSearch(search);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataCustomers2, setDataCustomers2] = useState(null);
  const [isDelete, setIsDelete] = useState(false)
  const [idDelete,setIdDelete] = useState(null)

  useFocusEffect(
    React.useCallback(() => {
      const func = async () => {
        const customers = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Users`);
        setDataCustomers(customers.data);
        setIsLoading(false);
      };
      func();
    }, [isDelete]));

  useFocusEffect(React.useCallback(() => {


    if (dataCustomers) {
      const data = dataCustomers.filter(item => item?.userName.toLowerCase().includes(search.toLowerCase()));
      setDataCustomers2(data);
    }
  }, [search, dataCustomers]));


  const deleteCustomer = id => {
    console.log(`${REACT_APP_URL}api/Users/${id}`)
  const rs = GLOBAL_API.requestDelete(`${REACT_APP_URL}api/Users/${id}`)
      alert("xoá thành công")
      setIsDelete(false)
    

  };
  return (
    <>
   {
!isDelete? 

    <View style={{flex: 1}}>
      <Header
        title="Danh sách người dùng"
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
      {isLoading ? (
        <ActivityIndicator size="large"/>
      ) : (
        <ScrollView style={{backgroundColor:"#6E7B8B"}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={{width: '100%', backgroundColor: '#6E7B8B'}}>
            <SearchBar size={30} onChangeText={updateSearch} value={search} />
          </View>
          <Text style={{fontSize: 25, marginLeft: 10,color:"white"}}>{'Danh sách khách hàng'}</Text>
          {dataCustomers2 && dataCustomers2.map((item, index) => <Item item={item} key={item?.id} stt={index} setIdDelete={setIdDelete} setIsDelete={setIsDelete}/>)}
        </ScrollView>
      )}
    </View>:
        <View>
        <Dialog.Container visible={true}>
          <Dialog.Title>Xoá khách hàng</Dialog.Title>
          <Dialog.Description>
            Bạn có chắc chắc muốn xoá khách hàng này
          </Dialog.Description>
          <Dialog.Button label="Xoá" onPress={()=>deleteCustomer(idDelete)}/>
          <Dialog.Button label="Huỷ bỏ"  onPress={()=>setIsDelete(false)}/>
        </Dialog.Container>
      </View>
   }
    </>
  );
};
const styles = StyleSheet.create({
  imageItem: {
    width: 50,
    height: 50,
  },
  buttonGroupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    right: 10,
    marginVertical: 10,
  },
});
export default ManageAccount;
