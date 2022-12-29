import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar } from '@rneui/themed';

import { useState, useEffect } from 'react';

import { BACKEND_URL } from '../Env';
import axios from 'axios';


const Home = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      let res;
      try {
        res = await axios.get(BACKEND_URL + '/user?page=1&limit=20', {
          headers: {
            'app-id': '638a51ead5f6176cb6309248',
          },
        });
        setMasterDataSource(res.data.data);
        setFilteredDataSource(res.data.data); //for filter functionality to work
      } catch (err) {
        console.log('error: ' + err);
      }
    };

    fetchEntries();
  }, []);

  const updateSearch = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const SingleItem = ({ item }) => {
    return (
      <ListItem
        Component={TouchableOpacity}
        topDivider
        containerStyle={styles.listItemStyle}
        onLongPress={() => alert('delete?')}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Update Entry', {
            itemId: item.id
          });
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.firstName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView>
      {masterDataSource ? (
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
            data={filteredDataSource}
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
