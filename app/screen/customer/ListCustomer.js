import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Platform, Image, Pressable } from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';

const Item = ({navigation}) => (
    <Pressable style={styles.itemContainer}  onPress={()=>{navigation.navigate("ChiTietKhachHang")}}>
    <View style={styles.imageContainer}>
    <Image source={Images.images.anhbaidoxe} style={styles.imageItem}></Image>
    </View>
    <View style={styles.containerText}>

      <Text style={{ fontSize:18,height:'25%',color:Colors.gray70, fontWeight:"bold"}} >Bùi Toại Nguyện</Text>
      <Text style={{ fontSize:25,height:'50%' , color:'red', textAlignVertical:'center'}}>59-P1-94949</Text>
      <Text style={{ fontSize:13,height:'25%'}}>còn 10 ngày</Text>
    </View>
  </Pressable>
);
const ListCustomer = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <View style={{backgroundColor: '#AFEEEE',flex:1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 'auto',
            width: 48,
            height: 48,
          }}
          onPress={() => {
            navigation.goBack();
            try {
              global.sound.stop();
            } catch (error) {}
          }}>
          <FontAwesome
            name={'long-arrow-left'}
            size={33}
            color={Colors.white}
            underlayColor="red"
            containerStyle={{paddingStart: 0, marginHorizontal: 10, marginVertical: 'auto'}}
          />
        </TouchableOpacity>

        <View style={{width: '100%'}}>
          <SearchBar placeholder="Tìm Kiếm Khách Hàng ..." size={30} platform="android"
            ref={search => this.search = search}
            onChangeText={updateSearch}
            value={search}
            />
        </View>
      </View>
      <ScrollView style={{}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <Text style={{fontSize:25}}>Danh sách khách hàng</Text>
        <View style={{}}>
            <Item navigation={navigation}></Item>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    top: 0,
  },
  itemContainer:{
    width:"100%",
    height:100,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:10,
    marginHorizontal:5
  },
  imageItem:{
    width:100,
    height:100,
    borderRadius:30
  },
  imageContainer:{
    width:100,
    height:100
  },
  containerText:{
    flex:1,
    height:100,
    padding:5
  }

});
export default ListCustomer;
