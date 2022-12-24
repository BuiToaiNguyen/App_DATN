import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';

import {Colors, Fonts, Images} from '@app/themes';

import Modal from 'react-native-modal';

export function ImagePickerModal({isVisible, onClose, onImageLibraryPress, onCameraPress}) {
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onClose} onBackdropPress={onClose} style={{}}>
        <SafeAreaView style={{flexDirection: 'row', justifyContent: 'space-around',position:'absolute', backgroundColor:'white',bottom:0,width:'100%',borderRadius:50}}>
          <Pressable style={{backgroundColor: 'white',width:50,height:50}} onPress={onImageLibraryPress}>
            <Image style={{ width:50,height:50}} source={Images.icons.gallery} />
            <Text style={{}}>Library</Text>
          </Pressable>
          <Pressable style={{ width:50,height:50}} onPress={onCameraPress}>
            <Image style={{ width:50,height:50}} source={Images.icons.camera} />
            <Text style={{}}>Camera</Text>
          </Pressable>
        </SafeAreaView>
    </Modal>
  );
}
 