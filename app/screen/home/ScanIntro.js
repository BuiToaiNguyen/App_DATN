import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Images} from '@app/themes';
import { Button } from 'react-native-paper';
import {TDButtonPrimary, TDButtonSecondary, TDDividerWithTitle, TDTextInputAccount} from '@app/components';
import { useNavigation } from '@react-navigation/native';

const ScanIntro = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Image source={Images.images.anhbaidoxe} style={styles.imageIntro}></Image>
      <TDButtonPrimary title={'Chụp Biển Số'} contentStyle={styles.buttonScan} titleStyle={styles.title} onPress={() => { navigation.navigate("ChupBienSo")}} />

    </View>
  );
};
const styles = StyleSheet.create({
  imageIntro: {
    height: 250,
    width: '100%',
    borderRadius: 2,
  },
  buttonScan:{
    position:"absolute",
    backgroundColor:Colors.primary,
    bottom:30,
    left:30,

    height:60,
    width:180,
  },
  title:{
    color:Colors.white,
    textAlign: 'center',
    fontSize:20,
  }
});

export default ScanIntro;
