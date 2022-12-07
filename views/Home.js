import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Button, SearchBar, Icon } from '@rneui/themed';

import { useState, useEffect } from 'react';

import { BACKEND_URL } from '../Env';
import axios from 'axios';


const Home = ({ navigation }) => {
  const [passwordEntryList, setPasswordEntryList] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      let res;
      try {
        res = await axios.get(BACKEND_URL + '/user?page=1&limit=20', {
          headers: {
            'app-id': '638a51ead5f6176cb6309248',
          },
        });
        setPasswordEntryList(res.data.data);
      } catch (err) {
        console.log('error: ' + err);
      }
    };

    fetchEntries();
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const SingleItem = ({ item }) => {
    return (
      <ListItem
        Component={TouchableOpacity}
        topDivider
        containerStyle={styles.listItemStyle}
        onLongPress={() => alert('delete?')}
        onPress={() => alert('success')}
      >
        <ListItem.Content>
          <ListItem.Title>{item.firstName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView>
      {passwordEntryList ? (
        <View style={styles.listContainerStyle}>
          <View style={styles.searchBarSectionStyle}>
            <SearchBar
              platform="ios"
              placeholder="Search here..."
              onChangeText={updateSearch}
              value={search}
            />
          </View>
          <FlatList
            data={passwordEntryList}
            renderItem={SingleItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View>
          <Text>You have no items to view</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItemStyle: {
    width: '100%',
    padding: 30,
  },
  listContainerStyle: {
    marginBottom: 120,
  },
  searchBarSectionStyle: {
    flexDirection: 'row'
  }
});

export default Home;
