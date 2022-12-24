import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, ScrollView, Alert, Image} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import { numberWithCommas } from '@app/utils/FuncHelper';
import { useSelector } from 'react-redux';

const Main_Ticket = () => {
  const {id} = useSelector(state => state.global.userInfo);

  const navigation = useNavigation();
  const [dailyTicket, setDailyTicket] = useState(0);
  const [monthlyTicket, setMonthlyTicket] = useState(0);
  const [error, setError] = useState(null);
  const [dataTicket, setDataTicket] = useState(null);
  const [loading, setLoading] = useState(true);


  
  const btnOk = async ()  => {
    if (dailyTicket == '') {
      setError('vui lòng nhập giá theo ngày !');
      return;
    }
    if (monthlyTicket == '') {
      setError('vui lòng nhập giá theo tháng !');
      return;
    }
    setError('');setDailyTicket

try{
const rs = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Prices/${dailyTicket.id}`,dailyTicket)
const rss = await GLOBAL_API.requestPUT(`${REACT_APP_URL}api/Prices/${monthlyTicket.id}`,monthlyTicket)

  if(rs&&rss){
    
    alert('sửa thành công');
    navigation.goBack();

  }
}
catch(err){
alert("có lỗi xảy ra")
}
  };

  useEffect(() => {
    const func = async () => {
      console.log('gọi api');
      const price = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Prices/byuser/${id}`);
      setDailyTicket(price.data[0]);
      setMonthlyTicket(price.data[1])
      console.log(price)
      setLoading(false)

        };
    func();
  }, [id]);
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
      { 
      monthlyTicket!= null && !loading?
      (
       
      
        <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Image source={Images.images.anhbaidoxe} style={styles.imageIntro}></Image>

          <Text style={{fontSize: 20, marginTop: 10, fontWeight: '500'}}>{dailyTicket?.code}</Text>
          <View >
            <TextInput
              multiline={false}
              style={styles.textinput}
              placeholderTextColor={Colors.gray60}
              keyboardType="numeric"
              value={`${dailyTicket?.money}`}
              onChangeText={value => setDailyTicket(pre =>({...pre,money:value}))}
            />
          </View>
          <Text style={{fontSize: 20, marginTop: 10, fontWeight: '500'}}>{monthlyTicket?.code}</Text>
          <View >
            <TextInput
              multiline={false}
              style={styles.textinput}
              placeholderTextColor={Colors.gray60}
              keyboardType="numeric"
              value={`${monthlyTicket?.money}`}
              onChangeText={value => setMonthlyTicket(pre =>({...pre,money:value}))}
            />
          </View>
          <Text style={{color: Colors.error, fontSize: Fonts.size.medium_bold}}>{error}</Text>
          <TDButtonPrimary title={'Hoàn Tất'} contentStyle={{marginTop: 32}} onPress={btnOk} />
        </ScrollView>
      ): <ActivityIndicator size="large"/> }
    </View>
  );
};

const styles = StyleSheet.create({
  textinput: {
    ...Fonts.style.large_regular,
    flex: 1,
    paddingVertical: 10,
    fontSize: 30,
    color: '#FF9966',
  },
  imageIntro: {
    height: 250,
    width: '100%',
    borderRadius: 2,
  },
});
export default Main_Ticket;
