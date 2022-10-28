import * as React from 'react';
import {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Alert, NativeModules, Image, TouchableHighlight, Pressable} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera, frameRateIncluded} from 'react-native-vision-camera';
import {Button} from 'react-native-paper';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle} from '@app/components';

export function Main_Cam() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const [huongCam, setHuongCam] = useState('front');
  const device = devices[huongCam];
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const func = async () => {
      if (image !== null) {
        const arrFileName = image.split('/');
        const filename = arrFileName[arrFileName.length - 1];
        photoPath = `${DownloadDirectoryPath}/${filename}`;
        await RNFS.moveFile(image, photoPath);
      }
    };
    func();
  }, []);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePhotos = async () => {
    try {
      console.log('Photo taking ....');
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });
      setImage('file://' + photo.path);
      RNFS.readFile('file://' + photo.path, 'base64').then(res => {
        console.log(res);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const renderCamera = () => {
    if (device == null) {
      return (
        <View>
          <Text style={{color: '#fff'}}>Loading</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          {device != null && hasPermission && (
            <>
              <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} photo={true} isActive={true} />
              <Pressable style={styles.box} onPress={takePhotos}>
                
              </Pressable>

              <Pressable style={styles.buttonRotate} onPress={() => setHuongCam(pre => (pre == 'front' ? 'back' : 'front'))}>
                <Icon name="arrow-square-left" size={30} color={'#fff'} />
              </Pressable>              
              <Pressable style={styles.buttonFlash} onPress={() => {}}>
                <Icon name="bolt" size={30} color={'#fff'} />
              </Pressable>
              {image && <Image source={{uri: image}} style={styles.image}></Image>}
            </>
          )}
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
  buttonRotate: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 5,
    top: 100,
  },  buttonFlash: {
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
