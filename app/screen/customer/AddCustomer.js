import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import { REACT_APP_URL } from '@app/config/Config';

const AddCustomer = () => {
  const [nameCustomer, setNameCustomer] = useState(null);
  const [ageCustomer, setAgeCustomer] = useState(null);
  const [addressCustomer, setAddressCustomer] = useState(null);
  const [numPhoneCustomer, setNumPhoneCustomer] = useState(null);
  const [nameCar, setNameCar] = useState(null);
  const [licensePlate, setLincesePlate] = useState(null);
  const [error,setError] = useState("")
  const [focus,setFocus] = useState("nameCustomer")
  strRegex = /(^[0-9]{2}-?[0-9A-Z]{1,3}$)|(^[A-Z0-9]{2,5}$)|(^[0-9]{2,3}-[0,9]{2}$)|(^[A-Z0-9]{2,3}-?[0-9]{4,5}$)|(^[A-Z]{2}-?[0-9]{0,4}$)|(^[0-9]{2}-?[A-Z0-9]{2,3}-?[A-Z0-9]{2,3}-?[0-9]{2}$)|(^[A-Z]{2}-?[0-9]{2}-?[0-9]{2}$)|(^[0-9]{3}-?[A-Z0-9]{2}$)$/
  const btnAdd = async ()=>{
    if(nameCustomer==null || nameCustomer==""){
        setError("vui lòng nhập tên khách hàng")
        setFocus("nameCustomer")
        return ;
    }
    if(numPhoneCustomer==null || numPhoneCustomer ==""){
        setError("vui lòng nhập số điện thoại")
        setFocus("numPhoneCustomer")
        return;
    }
    if(licensePlate==null || licensePlate==" "){
        setError("vui lòng nhập biển số")
        setFocus("licensePlate")
        return;
    }
    else{
        var lpOk = strRegex.test(licensePlate)
        if(!lpOk){
            setError("vui lòng nhập biển số đúng định dạng vd: 28-Y1-99999")
            setFocus("licensePlate")
            return;
        }
    }
    setError("")
    var customer={
        nameCustomer,
        licensePlate,
        nameCar,
        numberPhone:numPhoneCustomer,
        idUser:"3fa85f64-5717-4562-b3fc-2c963f66afa8",
        address:addressCustomer,
        age:ageCustomer,
    }
    console.log("bd gọi api")

    // const {data} =await GLOBAL_API.requestPOST(REACT_APP_URL+"api/Customers",customer)
    console.log(REACT_APP_URL+"api/Customers")
    const {data} =await GLOBAL_API.requestGET(REACT_APP_URL+"api/Customers")
     if(data!=null){
        alert("Thêm khách hàng thành công !")
     }
     else{
        alert("thêm thất bại")
     }
    

}
  return (
    <View style={{flex: 1, backgroundColor: Colors.bluish}}>
      <Header
        title="Thêm Khách Hàng"
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
      <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tên Khách Hàng *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên khách hàng'}
            value = {nameCustomer}
            autoFocus={focus=="nameCustomer"}
            onChangeText = {(text)=> setNameCustomer(text)}
          />
        </View>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tuổi Khách Hàng'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tuổi khách hàng'}
            value = {ageCustomer}
            onChangeText = {(text)=> setAgeCustomer(text)}
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
            value = {addressCustomer}
            onChangeText = {(text)=> setAddressCustomer(text)}
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
            value = {numPhoneCustomer}
            autoFocus={focus=="numPhoneCustomer"}

            onChangeText = {(text)=> setNumPhoneCustomer(text)}
          />
        </View>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tên Xe'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên xe '}
            value = {nameCar}
            onChangeText = {(text)=> setNameCar(text)}
          />
        </View> 
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Biển Số *'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'vd : 28-Y1-0308'}
            autoFocus={focus=="licensePlate"}
            value = {licensePlate}
            onChangeText = {(text)=> setLincesePlate(text)}
          />
        </View>

        <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>

        <TDButtonPrimary
          title={'Thêm Khách Hàng'}
          contentStyle={{marginTop: 32}}
          onPress={btnAdd}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default AddCustomer;
