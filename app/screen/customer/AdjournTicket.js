import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {CheckBox} from 'react-native-elements';
import {datediff, parseDate} from '@app/utils/FuncHelper';
import {applyMiddleware} from 'redux';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const AdjournTicket = ({route}) => {
  const {id} = useSelector(state => state.global.userInfo);

  const navigation = useNavigation();

  const [cbDaily, setCbDaily] = useState(true);
  const [cbMonthly, setCbMonthly] = useState(false);
  const [soLuong, setSoLuong] = useState(0);
  const [giaTien, setGiaTien] = useState(0);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyTicket, setDailyTicket] = useState(null);
  const [monthlyTicket, setMonthlyTicket] = useState(null);

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
          setGiaTien(convertToMoney(soLuong * dailyTicket?.money));
        } else {
          setGiaTien(convertToMoney(soLuong * monthlyTicket?.money));
        }
      }
    };
    func();
  }, [cbDaily, cbMonthly, soLuong]);

  useFocusEffect(
    React.useCallback(() => {
      const idCustomer = route?.params?.id;
      console.log(route);
      const func = async () => {
        const customer = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Customers/${idCustomer}`);
        setCustomer(customer.data);
        const ticket = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Tickets/ByIdCustomer/${idCustomer}`);
        setTicket(ticket.data);
        const price = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Prices/byuser/${id}`);
        setDailyTicket(price.data[0]);
        setMonthlyTicket(price.data[1]);
      };
      func();
      setLoading(false);
    }, [route.params]),
  );

  function convertToMoney(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  const btnOk = async () => {
    if (soLuong != '') {
      if (soLuong <= 0) {
        setError('nhập số lượng từ 1 trở lên');
        return;
      }
    } else {
      setError('vui lòng nhập số lượng');
      return;
    }
    setError('');
    const ghv = {idTicket: ticket.id, isDay: cbDaily, count: soLuong};

    console.log(ghv);
    const rs = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/tickets/GiaHanVe`, ghv);
    if (rs.data) {
      alert('gia hạn thành công');
    }

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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{flex: 1, padding: 10}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.containerProfile}>
         
         
          {customer?.code != 'string' && customer?.code != null ? (
                  <Image
                    source={{
                      uri: `data:image/jpg;base64,${customer?.code}`,
                    }}
                    style={styles.imageProfile}></Image>
                ) : (
                  <Image source={Images.icons.avatar} style={styles.imageProfile}></Image>
                )}


            {/* <Image source={{uri: `data:image/jpg;base64,${customer?.code}`}} style={styles.imageProfile}></Image> */}


          </View>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 16}}>{'Tên khách hàng :'}</Text>
            <Text style={{fontSize: 25, color: Colors.error, marginLeft: 10, fontWeight: '700'}}>{customer?.nameCustomer}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 16}}>{'Biển số :'}</Text>
            <Text style={{fontSize: 30, color: Colors.primary, marginLeft: 10, fontWeight: '700'}}>{customer?.licensePlate}</Text>
          </View>
          <View style={[styles.textContainer, {justifyContent: 'center'}]}>
            <CheckBox
              onPress={cbDailyClick}
              checked={cbDaily}
              title="Theo ngày"
              iconRight
              checkedColor="green"
              backgroundColor={Colors.transparent}></CheckBox>
            <CheckBox
              onPress={cbMonthlyClick}
              checked={cbMonthly}
              title="Theo tháng"
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
      )}
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
