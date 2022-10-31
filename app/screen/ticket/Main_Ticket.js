import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';

const Main_Ticket = () => {
    const navigation = useNavigation();
  const [dailyTicket, setDailyTicket] = useState(0);
  const [monthlyTicket, setMonthlyTicket] = useState(0);
    const [error,setError] = useState(null);
  const btnOk =()=>{
    if(dailyTicket==""){
        setError("vui lòng nhập giá theo ngày !")
        return;
    }
    if(monthlyTicket==''){
        setError("vui lòng nhập giá theo tháng !")
        return;
    }
    setError("")

    //call api
    alert("sửa thành công")
    navigation.goBack();
  }

  useEffect(()=>{


    //call api get data
  })
  return (
    <View style={{flex: 1, backgroundColor: Colors.bluish}}>
      <Header
        title="Điều chỉnh giá vé"
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
        <Image source={Images.images.anhbaidoxe} style={styles.imageIntro}></Image>

        <Text style={{fontSize: 20, marginTop: 10,fontWeight:"500" }}>{'Thẻ Ngày (1 ngày)'}</Text>
        <View style={{}}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            keyboardType="numeric"
            value={`${dailyTicket}`}
            onChangeText={value => setDailyTicket(value)}
          />
        </View>
        <Text style={{fontSize: 20, marginTop: 10,fontWeight:"500" }}>{'Thẻ Tháng (1 tháng)'}</Text>
        <View style={{}}>
          <TextInput
            multiline={false}
            style={styles.textinput}
            placeholderTextColor={Colors.gray60}
            keyboardType="numeric"
            value={`${monthlyTicket}`}
            onChangeText={value => setMonthlyTicket(value)}
          />
        </View>
        <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>
        <TDButtonPrimary
          title={'Hoàn Tất'}
          contentStyle={{marginTop: 32}}
           onPress={btnOk}
        />  
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textinput: {
    ...Fonts.style.large_regular,
    flex: 1,
    paddingVertical: 10,
    fontSize:30,
    color:"#FF9966",

  },
  imageIntro: {
    height: 250,
    width: '100%',
    borderRadius: 2,
  },
});
export default Main_Ticket;
