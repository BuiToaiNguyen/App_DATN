import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, VirtualizedList} from 'react-native';
import {Colors, Images} from '@app/themes';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Thêm Khách Hàng',
    icon: 'user-plus',
    page: 'ThemKhachHang',
  },
  // {
  //   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //   title: 'Gia Hạn Vé ',
  //   icon: 'ticket',
  //   page: 'GiaHanVe',
  // },
  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //   title: 'Xem Xe Đăng Ký',
  //   icon: 'car',
  //   page: 'XemXeDangKy',
  // },
  {
    id: '58694a0f-3da1-471f-bd96-14e29d72',
    title: 'Xem Khách Hàng',
    icon: 'list',
    page: 'DanhSachKhachHang',
  },  

  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d73',
  //   title: 'Xem Tài Khoản',
  //   icon: 'user',
  //   page: 'XemTaiKhoan',
  // },
  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d75',
  //   title: 'Chụp Biển Sô',
  //   icon: 'camera',
  //   page: 'ChupBienSo',
  // },
  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d',
  //   title: 'Chính Sách Bảo Mật',
  //   icon: 'shield',
  //   page: 'ChinhSacBaoMat',
  // },
  // {
  //   id: '58694a0f-3da1-1f-bd96-145571e29d',
  //   title: 'Thống Kê Doanh Thu ',
  //   icon: 'file-chart-pie',
  //   page: 'ThongKeDoanhThu',
  // },
  {
    id: '58694a0f-3da1-1f45571e29d',
    title: 'Quán Lý Giá Vé',
    icon: 'ticket',
    page: 'QuanLyGiaVe',
  }, 
  {
    id: '5860f-3da1-1f45571e29d',
    title: 'Chụp Biển Số',
    icon: 'camera',
    page: 'ChupBienSo',
  },
  {
    id: '58694a0f-3da1-471f-bd29d72',
    title: 'Lịch Sử Quét',
    icon: 'history',
    page: 'LichSuQuet',
  },

];

const Item = ({title, icon, page}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate(page);
      }}>
      <View style={styles.itemContainer}>
        <Icon name={icon} size={32} color={'white'} solid={false} style={styles.icon} />

        <Text style={styles.title} numberOfLines={1} >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const List = () => {
  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 25, marginVertical: 10,color:'white',marginLeft:10}}>Danh mục</Text>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.buttonTouch}>
        {DATA.map(item => (
          <Item title={item.title} icon={item.icon} key={item.id} page={item.page}></Item>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    // backgroundColor: Colors.lightGray,
    borderRadius: 30,
    height: 70,

    width: '33%',
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color:'white'
  },
  buttonTouch: {
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  icon: {},
});

export default List;
