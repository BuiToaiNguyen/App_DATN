import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {ListItem} from '@rneui/themed';
import Search from './Search';
import ScanIntro from './ScanIntro';
import List from './ListItem';
import {ScrollView} from 'react-native-virtualized-view';
import { Header } from '@app/components';
import { Colors, Fonts } from '@app/themes';
import { useSelector } from 'react-redux';

const Home = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#87CEEB"}} >

      <ScrollView>
        {/* <Search /> */}
        <ScanIntro />
        <List />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
