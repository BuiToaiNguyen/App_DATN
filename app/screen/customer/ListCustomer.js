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
import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL, IMAGEBASE64} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {datediff, parseDate, tinhNgay} from '@app/utils/FuncHelper';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// import debounce from 'lodash';

const Item = ({navigation, name, licesePlate, day, id, code}) => (
  <Pressable
    style={styles.itemContainer}
    onPress={() => {
      navigation.navigate('ChiTietKhachHang', {idCustomer: id});
    }}>
    <View style={styles.imageContainer}>
      {code != 'string' && code != null ? (
        <Image
          source={{
            uri: `data:image/jpg;base64,${code}`,
          }}
          style={styles.imageItem}></Image>
      ) : (
        <Image source={Images.icons.avatar} style={styles.imageItem}></Image>
      )}
    </View>
    <View style={styles.containerText}>
      <Text style={{fontSize: 19, height: '25%', color: 'white', fontWeight: 'bold'}}>{name}</Text>
      <Text style={{fontSize: 25, height: '50%', color:  tinhNgay(day) <0 ? "red":"green" , textAlignVertical: 'center'}}>{licesePlate}</Text>
      <Text style={{fontSize: 13, height: '25%' }}>{`${
        tinhNgay(day) != -1 ? 'Còn ' + Math.floor(tinhNgay(day)) + ' ngày' : 'Hết hạn hoặc chưa đăng ký vé'
      } `}</Text>
    </View>
  </Pressable>
);
const ListCustomer = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [dataCustomers, setDataCustomers] = useState(null);
  const [dataCustomers2, setDataCustomers2] = useState(null);
  const {id} = useSelector(state => state.global.userInfo);

  // const changeTextDebouncer = useCallback(debounce(updateSearch, 1000), []);

  const updateSearch = search => {
    setSearch(search);
  };
  useFocusEffect(
    React.useCallback(() => {
      const func = async () => {
        try {
          console.log(REACT_APP_URL + `api/customers/byUSer/${id}`);
          const data = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/Tickets/ByIdCustomer2/${id}`);
          setDataCustomers(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      func();
      setLoading(false);
    }, [id]),
  );

  useEffect(() => {
    if (dataCustomers) {
      const data = dataCustomers.filter(
        item =>
          item.customer.nameCustomer.toLowerCase().includes(search.toLowerCase()) ||
          item.customer.licensePlate.toLowerCase().includes(search.toLowerCase()),
      );
      setDataCustomers2(data);
    }
  }, [search, dataCustomers]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{backgroundColor: '#6E7B8B', flex: 1}}>
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

            <View style={{width: '100%', backgroundColor: '#6E7B8B'}}>
              <SearchBar
                placeholder="Tìm Kiếm Khách Hàng ..."
                size={30}
                ref={search => (this.search = search)}
                onChangeText={updateSearch}
                value={search}
              />
            </View>
          </View>
          {dataCustomers != null ? (
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <Text style={{fontSize: 25, marginLeft: 10}}>Danh sách khách hàng </Text>
              <View style={{}}>
                {dataCustomers2 &&
                  dataCustomers2.map(item => (
                    <Item
                      day={item.hanVe}
                      navigation={navigation}
                      name={item?.customer.nameCustomer}
                      id={item?.customer.id}
                      licesePlate={item?.customer.licensePlate}
                      key={item?.customer?.id}
                      code={item?.customer?.code}></Item>
                  ))}
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    //height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    top: 0,
    marginBottom: 20,
  },
  itemContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginHorizontal: 5,
    paddingLeft: 10,
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  containerText: {
    flex: 1,
    height: 100,
    padding: 5,
    marginLeft: 10,
  },
});
export default ListCustomer;
