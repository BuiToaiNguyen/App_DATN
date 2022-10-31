import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Platform, Image, Pressable} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import Dialog from "react-native-dialog";

const DetailCustomer = () => {
const navigation = useNavigation();
const [nameCustomer, setNameCustomer] = useState(null);
const [ageCustomer, setAgeCustomer] = useState(null);
const [addressCustomer, setAddressCustomer] = useState(null);
const [numPhoneCustomer, setNumPhoneCustomer] = useState(null);
const [nameCar, setNameCar] = useState(null);
const [licensePlate, setLincesePlate] = useState(null);

const [isDelete, setIsDelete] = useState(false)

useEffect(()=>{

    //call api 
},[])



const deleteCustomer = ()=>{
    console.log("xử lí xoá ")
}
const editCustomer = ()=>{

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
      <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.containerProfile}>
          <Image source={Images.images.anhbaidoxe} style={styles.imageProfile}></Image>
          <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold, marginVertical:10}}>{'còn hạn 15 ngày'}</Text>
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
        ]} onPress={()=>{navigation.push("GiaHanVe")}}>
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
            // value = {'nguyện'}
            // onChangeText = {(text)=> setAddressCustomer(text)}
          />
        </View>  
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tuổi Khách Hàng'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tuổi khách hàng'}
            // value = {ageCustomer}
            // onChangeText = {(text)=> setAgeCustomer(text)}
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
            // value = {addressCustomer}
            // onChangeText = {(text)=> setAddressCustomer(text)}
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
            // value = {numPhoneCustomer}
            // autoFocus={focus=="numPhoneCustomer"}

            // onChangeText = {(text)=> setNumPhoneCustomer(text)}
          />
        </View>
        <Text style={{color: Colors.gray70, fontSize: Fonts.size.medium_bold}}>{'Tên Xe'}</Text>
        <View style={styles.textinputContent}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            placeholder={'nhập tên xe '}
            // value = {nameCar}
            // onChangeText = {(text)=> setNameCar(text)}
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
            // value = {licensePlate}
            // onChangeText = {(text)=> setLincesePlate(text)}
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
          
      </ScrollView>
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
