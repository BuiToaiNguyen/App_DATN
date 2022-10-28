import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';


const SwitchComponent = () => {
const [search, setSearch] = useState("");

const updateSearch = (search) => {
  setSearch(search);
};

return (
  <View style={styles.view}>
    <SearchBar
      placeholder="Tìm Kiếm Khách Hàng ..."
      onChangeText={updateSearch}
      value={search}
      
    />
  </View>
);
};

const styles = StyleSheet.create({
view: {
  marginTop: 0
  ,
},
});

export default SwitchComponent;