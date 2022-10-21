import * as React from 'react';
import { useRef, useState, useMemo, useCallback ,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler } from 'react-native-gesture-handler';
import {
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
  VideoFile,
} from 'react-native-vision-camera';
import { Camera, frameRateIncluded } from 'react-native-vision-camera';
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated';

export const Main_Cam =()=>{
    const camera = useRef(null);
    const newCameraPermission =  Camera.requestCameraPermission()
    const devices = useCameraDevices('wide-angle-camera')
    const [cameraPosition, setCameraPosition] = useState('back');
    const device = devices[cameraPosition];
    alert(newCameraPermission);

    if (device == null) return <View />
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}

      />
    )
    
}





