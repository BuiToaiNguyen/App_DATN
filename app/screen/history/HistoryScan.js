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
import GLOBAL_API from '../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {datediff, parseDate, tinhNgay} from '@app/utils/FuncHelper';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {debounce} from 'lodash';

const Item = ({item}) => {
  return (
    <>
    <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
      <View style={{}}>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri:
              item?.code != null
                ? `data:image/jpg;base64,${item?.code}`
                : 'https://cdn.chanhtuoi.com/uploads/2022/01/hinh-avatar-nam-deo-kinh.jpg',
          }}></Image>
      </View>
      <View style={{flex: 1, marginLeft: 5}}>
        <Text style={{fontSize: 25, fontWeight: '600',color:"white"}}>{item?.licensePlate}</Text>
        <Text style={{fontSize: 18, color:item?.status == 1 ?"#66FF99":"#CC3300" }}>Trạng thái: {item?.status == 1 ? 'Còn hạn' : 'Hết hạn hoặc chưa đăng ký'}</Text>
        <Text style={{fontSize: 17, marginTop: 5}}>Thời gian: {item?.createAt.split(".")[0]} </Text>
      </View>
    </View>
    <View style={{height:1, backgroundColor:"black"}}></View>


    </>
  );
};
const HistoryScan = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.global.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [dataScan, setDataScan] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const func = async () => {
        const data = await GLOBAL_API.requestGET(`${REACT_APP_URL}api/ActionScans/byUser/${user.id}`);
        setDataScan(data.data);
        setIsLoading(false);
      };
      func();
    }, []),
  );

  return (
    <View style={{flex: 1,backgroundColor:"#6E7B8B"}}>
      <Header
        title="Lịch sử quét"
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

      {isLoading ? (
        <ActivityIndicator  size="large"/>
      ) : (
        <ScrollView style={{}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Text style={{fontSize: 30, marginLeft: 10,color:"white"}}>{'Lịch sử quét'}</Text>
        
          {!isLoading && dataScan.map((item, index) => <Item key={index} item={item} />)}
        </ScrollView>
      )}
    </View>
  );
};

export default HistoryScan;
