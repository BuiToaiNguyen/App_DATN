import * as React from 'react';
import {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Alert, NativeModules, Image, TouchableHighlight, Pressable, TouchableOpacity} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera, frameRateIncluded} from 'react-native-vision-camera';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle} from '@app/components';
import {Root, Toast} from 'react-native-popup-confirm-toast';
import {useNavigation} from '@react-navigation/native';
import GLOBAL_API from '@app/screen/services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {useSelector} from 'react-redux';
import ImageResizer from '@bam.tech/react-native-image-resizer';

export default function ChupBienSo() {
  const {id} = useSelector(state => state.global.userInfo);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const [huongCam, setHuongCam] = useState('back');
  const device = devices[huongCam];
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [dataCustomer, setData] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isViewCustomer, setIsViewCustomer] = useState(0);
  const [loadding, setIsLoadding] = useState(false);
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const btnViewCustomer = () => {
    navigation.navigate('ChiTietKhachHang', {idCustomer: dataCustomer?.customer?.id});
  };
  useEffect(() => {
    (async () => {
      if (imageBase64 != null) {
        console.log('callApi');
        const data = await GLOBAL_API.requestPOST(`${REACT_APP_URL}api/ActionScans`, {idUserScan: id, imageBase64});
let text=""
let color=""
  if(data.data?.code == 1){
    text = "Biển số hết hạn "
  }  
  if(data.data?.code == 2){
    text = "Biển số chưa đc đăng ký vé "
  }  
  if(data.data?.code == 4){
    text = "Biển số lạ chưa đăng ký"
  }
  if(data.data?.code == 3){
    text = "Biển số còn hạn " + data.data?.day + " ngày"
  }



        Toast.show({
          backgroundColor: data.data?.code == 3 ? '#556b2f' : '#ffa7a2',
          title: data?.data?.licensePlate,
          text: text,
          titleTextStyle : {color: '#fff',fontWeight: 'bold',fontSize: 19},
          descTextStyle : {marginTop: 5,fontSize: 16,color: '#fff', fontWeight: '400',},
          color: '#702c91',
          timeColor: data.data?.code == 3 ? 'green' : 'red',
          timing: 5000,
          icon: (
            <Icon
              name={data.data?.code ==3  ? 'check':'window-close'  }
              color={data.data?.code ==3 ? '#fff' : 'red'}
              size={31}
            />
          ),
          position: 'top',
        });
        setIsLoadding(false);
        if (data?.data?.code == 3 || data?.data?.code == 1 || data?.data?.code == 2  ) {
          setIsViewCustomer(data?.data?.code);
          console.log(data.data);
          setData(data.data);
          setTimeout(() => {
            setIsViewCustomer(0);
          }, 5000);
        }
      }
    })();
  }, [imageBase64]);
  const takePhotos = async () => {
    try {
      if (!loadding) {
        setIsViewCustomer(0);
        setIsLoadding(true);
        console.log('bđ chụp');

        const photo = await camera.current.takePhoto({
          // flash: flash,
        });
        setImage('file://' + photo.path);

        if (photo.path) {
          ImageResizer.createResizedImage('file://' + photo.path, 200, 600, 'PNG', 100, 0).then(response => {
            RNFS.readFile(response.uri, 'base64')
              .then(res => {
                setImageBase64(res);
                console.log(response.size)
              })
              .catch(err => {
                console.log('có lỗi');
              });
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderCamera = () => {
    const navigation = useNavigation();
    if (device == null) {
      return (
        <View>
          <Text style={{color: '#fff'}}>Loading</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, paddingVertical: 28}}>
          {device != null && hasPermission && (
            <>
              <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                photo={true}
                isActive={true}
                enableAutoStabilization={true}
              />
              <Pressable
                style={[styles.box, {backgroundColor: loadding ? 'gray' : 'white'}]}
                onPress={takePhotos}
                disabled={loadding}></Pressable>
              {isViewCustomer !=0 && (
                <Pressable style={styles.viewCustomer} onPress={btnViewCustomer}>
                  <Text style={{textAlign: 'center', color: 'white', fontSize:18}}>{ isViewCustomer ==3 ?"Xem chi tiết khách hàng" : "Đăng ký vé hoặc gia hạn"}</Text>
                </Pressable>
              )}

              <Pressable style={styles.buttonRotate} onPress={() => setHuongCam(pre => (pre == 'front' ? 'back' : 'front'))}>
                <Icon name="sync" size={30} color={'#fff'} />
              </Pressable>

              <Pressable
                style={{position: 'absolute', top: 5, left: 5}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="times-circle" size={30} color={'#FF3300'} />
              </Pressable>

              {image && <Image source={{uri: image}} style={styles.image}></Image>}
            </>
          )}
          <Root>
            <View>
              <TouchableOpacity onPress={() => {}}>
                <Text></Text>
              </TouchableOpacity>
            </View>
          </Root>
        </View>
      );
    }
  };
  return <View style={{flex: 1}}>{renderCamera()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  viewCustomer: {
    width: '30%',
    position: 'absolute',
    right: '35%',
    top: 100,
    textAlign: 'center',
    backgroundColor: '#0066FF',
    padding: 10,
    borderRadius: 20, 
  },
  buttonRotate: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 5,
    top: 100,
  },
  buttonFlash: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 5,
    top: 50,
  },
  box: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 40,
    left: '40%',
    backgroundColor: 'white',
    // backgroundColor: 'gray',
    borderRadius: 50,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
  image: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 75,
    height: 100,
  },
});
