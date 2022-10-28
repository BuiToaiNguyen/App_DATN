import React from 'react';
import {View} from 'react-native';
import {ListItem} from '@rneui/themed';
import Search from './Search';
import ScanIntro from './ScanIntro';
import List from './ListItem';
import { ScrollView } from 'react-native-virtualized-view'


const Home = () => {
  return (
    <ScrollView>
      <Search />
      <ScanIntro />
    <List/>
    </ScrollView>
  );
};

export default Home;
