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
import {useEffect,useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Images} from '@app/themes';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import {Header} from '@app/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import GLOBAL_API from './../services/apiServices';
import {REACT_APP_URL} from '@app/config/Config';
import {SearchBar} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {datediff, parseDate, tinhNgay} from '@app/utils/FuncHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {debounce} from 'lodash';

const HistoryScan = () => {
    return (
        <div>
            
        </div>
    );
}

export default HistoryScan;
