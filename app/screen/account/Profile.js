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
  SafeAreaView,
} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {ListItem} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

export default Profile = () => {
  const navigation = useNavigation();
  const user = useSelector((state)=>state.global.userInfo)
  const listItem = [
    {
      title: 'Thông tin cá nhân',
      icon: 'user',
      screen: 'Account',
    },
    {
      title: 'Thay đổi mật khẩu',
      icon: 'lock',
      screen: 'ChangePasswordScreen',
    },
    {
      title: 'Quên mật khẩu',
      icon: 'unlock',
      screen: 'ForgotScreen',
    },
  ];
  const LogOut = async () => {
    try {
      const jsonValue = JSON.stringify({userName: null, password: null});
      await AsyncStorage.setItem('@user', jsonValue);
      navigation.navigate("SignInScreen")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{paddingVertical: 28, backgroundColor: 'white', flex: 1}}>
      <View syle={styles.container}>
        <View style={styles.headerContainer}>
        <Image style ={styles.imageProfile} source={{uri: (user?.code !="string" ? `data:image/jpg;base64,${user?.code}`  : "https://cdn.chanhtuoi.com/uploads/2022/01/hinh-avatar-nam-deo-kinh.jpg")}}></Image>
          <View style={{padding: 4, marginLeft: 15}}>
            <Text style={{textAlignVertical: 'center', fontSize: 26, fontWeight: '700'}}>{user?.fullName}</Text>
          </View>
        </View>
     

        <ScrollView style={{paddingVertical: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View>
            {listItem.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  navigation.navigate(item.screen);
                }}>
                <ListItem bottomDivider>
                  <Icon name={item.icon} size={30} />
                  <ListItem.Content>
                    <ListItem.Title style={{}}>{item.title}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </Pressable>
            ))}

            <Pressable onPress={LogOut}>
              <ListItem bottomDivider>
                <Icon name={'arrow-right'} size={30} />
                <ListItem.Content>
                  <ListItem.Title style={{}}>{'Đăng xuất'}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 28,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 'auto',
  },
});
