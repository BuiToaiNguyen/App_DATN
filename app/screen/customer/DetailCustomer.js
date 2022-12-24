import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity,ActivityIndicator, ScrollView, Alert, Platform, Image, Pressable} from 'react-native';
import {useEffect} from 'react';
import {useNavigation,useRoute,useNavigationParam} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import Dialog from "react-native-dialog";
import { datediff,parseDate, tinhNgay } from '@app/utils/FuncHelper';
import { useFocusEffect } from '@react-navigation/native';

const DetailCustomer = ({route}) => {
const navigation = useNavigation();
// const [nameCustomer, setNameCustomer] = useState(null);
// const [ageCustomer, setAgeCustomer] = useState(null);
// const [addressCustomer, setAddressCustomer] = useState(null);
// const [numPhoneCustomer, setNumPhoneCustomer] = useState(null);
// const [nameCar, setNameCar] = useState(null);
// const [licensePlate, setLincesePlate] = useState(null);

const [isDelete, setIsDelete] = useState(false)
const [dataCustomer,setDataCustomer] =useState(null)
const [isLoading,setIsLoading] = useState(true)
const [ticket,setTicket] = useState(null)

const {idCustomer} = route.params
useFocusEffect(React.useCallback(() => {
  console.log("a")
  const func = async ()=>{
    const customer =  await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Customers/${idCustomer}`)
    setDataCustomer(customer.data)
  
    const ticket = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Tickets/ByIdCustomer/${idCustomer}`)
    setTicket(ticket.data)
    
  }
  func()


},[idCustomer]))

const deleteCustomer = async ()=>{

  console.log("xử lí xoá ")
  dataCustomer.isDelete=true
  const rs = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Customers/${idCustomer}`,dataCustomer)
  setIsDelete(false)
  if(rs?.id){
    alert("xoá thành công")
    navigation.goBack();
  }
  else{
    alert("xoá không thành công")
  }
}



const editCustomer =async ()=>{
  const rs = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Customers/${idCustomer}`,dataCustomer)
  console.log(rs)
  if(rs?.id){
    alert("sửa thành công")
    navigation.goBack();
  }
  else{
    alert("sửa không thành công")
  }
}
  return (
      <View  style={{flex: 1, backgroundColor: Colors.bluish}}>
    {
    !isDelete?

    <View style={{flex: 1, backgroundColor: Colors.bluish}}>
      <Header
        title="Chi tiết khách hàng"
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
        {dataCustomer!=null ?
        ( 
      <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        


        <View style={styles.containerProfile}>
          <Image source={{uri:
            `data:image/jpg;base64,${dataCustomer?.code}`

          }} style={styles.imageProfile}></Image>
          <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold, marginVertical:10}}>{ticket?.status=="chưa"?"Chưa đăng ký!":(`${ tinhNgay(ticket?.hanVe) !=-1? "Còn "+Math.ceil(tinhNgay(ticket?.hanVe)) +" ngày" :"Chưa đăng ký vé" } `)}</Text>
            <Pressable  style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : '#6699CC',
              paddingHorizontal:10,
              paddingVertical:5,
              borderRadius:20,
          },
          styles.wrapperCustom
        ]} onPress={()=>{navigation.navigate("GiaHanVe",{id:dataCustomer?.id})}}>
                <Text style={{color:'white'}}>{"Gia hạn vé"}</Text>
            </Pressable>
        </View>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tên Khách Hàng'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên khách hàng'}
            value = {dataCustomer.nameCustomer}
            onChangeText = {(value)=> setDataCustomer(pre=>({...pre,nameCustomer:value}))}
          />
        </View>  
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tuổi Khách Hàng'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tuổi khách hàng'}
             value = {dataCustomer.age}
             onChangeText = {(value)=> setDataCustomer(pre=>({...pre,age:value}))}
             keyboardType="numeric"
          />
        </View>  
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Địa Chỉ'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập địa chỉ khách hàng'}
             value = {dataCustomer.address}
             onChangeText = {(value)=> setDataCustomer(pre=>({...pre,address:value}))}
             />
        </View>      
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Số Điện Thoại *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập số điện thoại *'}
            keyboardType="numeric"
            value = {dataCustomer.numberPhone}
            onChangeText = {(value)=> setDataCustomer(pre=>({...pre,numberPhone:value}))}
          />
        </View>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tên Xe'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên xe '}
            value = {dataCustomer.nameCar}
            onChangeText = {(value)=> setDataCustomer(pre=>({...pre,nameCar:value}))}
          />
        </View> 
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Biển Số *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'vd : 28-Y1-0308'}
            // autoFocus={focus=="licensePlate"}
             value = {dataCustomer.licensePlate}
             onChangeText = {(value)=> setDataCustomer(pre=>({...pre,licensePlate:value}))}
             />
        </View>
        <TDButtonPrimary
          title={'Sửa khách hàng'}
          contentStyle={{marginTop: 32}}
           onPress={editCustomer}
        />   
        <TDButtonPrimary
        onPress={()=>setIsDelete(true)        }
          title={'Xoá khách hàng'}
          contentStyle={{marginTop: 5,backgroundColor:Colors.error}}
        /> 
        <View style={{height:30}}>

        </View>
        
        
          
      </ScrollView>):<ActivityIndicator size='large'/>
        }
    </View>
    :
    <View>
    <Dialog.Container visible={true}>
      <Dialog.Title>Xoá khách hàng</Dialog.Title>
      <Dialog.Description>
        Bạn có chắc chắc muốn xoá khách hàng này
      </Dialog.Description>
      <Dialog.Button label="Xoá" onPress={deleteCustomer}/>
      <Dialog.Button label="Huỷ bỏ"  onPress={()=>setIsDelete(false)}/>
    </Dialog.Container>
  </View>
}
    </View>
  );
};

const styles = StyleSheet.create({
  containerProfile: {
    height: 180,
    alignItems: 'center',
    padding: 10,
  },

  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 15,
    margin:'auto'
  },
  
});
export default DetailCustomer;
