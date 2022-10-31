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
import {CheckBox} from 'react-native-elements';

const AdjournTicket = () => {
  const navigation = useNavigation();
  const [cbDaily, setCbDaily] = useState(true);
  const [cbMonthly, setCbMonthly] = useState(false);
  const [soLuong, setSoLuong] = useState(0);
  const [giaTien, setGiaTien] = useState(0);
  const [error, setError] = useState('');

  const cbDailyClick = () => {
    setCbDaily(pre => !pre);
    setCbMonthly(pre => !pre);
  };
  const cbMonthlyClick = () => {
    setCbDaily(pre => !pre);
    setCbMonthly(pre => !pre);
  };
  useEffect(() => {
    const func = () => {
      if (soLuong != 0 && soLuong != '') {
        if (cbDaily) {
          setGiaTien(convertToMoney(soLuong * 5000));
        } else {
          setGiaTien(convertToMoney(soLuong * 150000));
        }
      }
    };
    func();
  }, [cbDaily, cbMonthly, soLuong]);

  function convertToMoney(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  const btnOk = () => {
    if (soLuong != '') {
      if (soLuong <= 0) {
        setError('nhập số lượng từ 1 trở lên');
        return;
      }
    } else {
      setError('vui lòng nhập số lượng');
      return;
    }
    setError("")

    // call api
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.bluish}}>
      <Header
        title="Gia hạn vé"
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
      <ScrollView style={{flex: 1, padding: 10}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.containerProfile}>
          <Image source={Images.images.anhbaidoxe} style={styles.imageProfile}></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 16}}>{'Tên khách hàng :'}</Text>
          <Text style={{fontSize: 25, color: Colors.error, marginLeft: 10, fontWeight: '700'}}>{'Bùi Toại Nguyện'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 16}}>{'Biển số :'}</Text>
          <Text style={{fontSize: 30, color: Colors.primary, marginLeft: 10, fontWeight: '700'}}>{'29-Y1-0308'}</Text>
        </View>
        <View style={[styles.textContainer, {justifyContent: 'center'}]}>
          <CheckBox
            onPress={cbDailyClick}
            checked={cbDaily}
            title="Vé ngày"
            iconRight
            checkedColor="green"
            backgroundColor={Colors.transparent}></CheckBox>
          <CheckBox
            onPress={cbMonthlyClick}
            checked={cbMonthly}
            title="Vé tháng"
            iconRight
            checkedColor="green"
            backgroundColor={Colors.transparent}></CheckBox>
        </View>
        <Text style={{fontSize: 16, marginTop: 10}}>{'Số lượng :'}</Text>
        <TextInput
          multiline={false}
          style={styles.textinput}
          placeholderTextColor={Colors.gray60}
          placeholder={'nhập sô lượng '}
          keyboardType="numeric"
          onChangeText={value => setSoLuong(value)}
          value={soLuong}
        />
        <Text style={{fontSize: 16, marginTop: 10}}>{'Giá tiền :'}</Text>
        <Text style={{fontSize: 24, color: 'red', marginTop: 10}}>{giaTien + ' VND'}</Text>

        <Text style={{color: Colors?.error, fontSize: Fonts.size.medium_bold, marginTop: 10}}>{error}</Text>

        <TDButtonPrimary title={'Hoàn Tất'} contentStyle={{marginTop: 32}} onPress={btnOk} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    alignItems: 'center',
  },
  containerProfile: {
    height: 120,
    alignItems: 'center',
    padding: 10,
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 15,
    margin: 'auto',
  },
  textinput: {
    ...Fonts.style.large_regular,
    flex: 1,
    paddingVertical: 10,
  },
});
export default AdjournTicket;
