import * as React from 'react';
import {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Alert, NativeModules, Image } from 'react-native';
import {
  useCameraDevices
} from 'react-native-vision-camera';
import {Camera, frameRateIncluded} from 'react-native-vision-camera';
import {Button} from 'react-native-paper';
import RNFS,{DownloadDirectoryPath} from 'react-native-fs';

export function Main_Cam() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.front;
  const camera = useRef(null);
  const [image,setImage] = useState(null);
  const direction = "Image"

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);


  const takePhotos = async () => {
    try {
      console.log('Photo taking ....');
      const photo = await camera.current.takePhoto({
        flash: 'off'
      })
      setImage("file://"+photo.path);
      RNFS.readFile("file://"+photo.path, 'base64')
      .then(res =>{
        console.log(res);
      });

    } catch (e) {
      console.error(e);
    }
  };


  useEffect( ()=>{
    (async () => {
      if( image!==null ){
        const arrFileName = image.split('/');
        const filename = arrFileName[arrFileName.length -1]
        photoPath = `${DownloadDirectoryPath }/${filename}`;
        await RNFS.moveFile(image, photoPath);
      }
    })();


  },[])

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
              <Button style={styles.box} onPress={takePhotos}>
              </Button>
              { 
              image && <Image 
              source={{uri:image}}
              style={styles.image}
              
              ></Image>
                }
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
  box: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 40,
    left: '40%',
    backgroundColor: 'white',
    borderRadius: 50,
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
  image :{
    position:"absolute",
    bottom:20,
    right:10,
    width:75,
    height:100
  }
});
