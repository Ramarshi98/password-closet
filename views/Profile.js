import { Avatar, Button, Icon, ListItem, Switch } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Linking } from 'react-native';
import { primaryColor, primaryFontFamily } from '../GlobalVariables';

// Email, password

const userProfileData = [
  {
    IconName: 'email',
    value: 'test@email.com', //from API Call
  },
  {
    IconName: 'lock',
    value: '****',
  },
];

const Profile = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleHandler = (value) => {
    setIsEnabled(!isEnabled);
    if (!!value) {
      alert('TO_DO - Turn on phone passcode' + value);
    } else {
      alert('Phone security login disabled');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        style={styles.UserProfileItemStyle}
        containerStyle={{ backgroundColor: primaryColor }}
      >
        <Icon name={item.IconName} size={40} style={{ padding: 10 }} />
        <ListItem.Content>
          <ListItem.Title style={styles.UserProfileTextStyle}>{item.value}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const editProfileHandler = async () => {
    //TO DO
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topThird}>
        <Text style={styles.UserNameStyle}>Raahil Amarshi</Text>
        <Avatar
          size={70}
          rounded
          containerStyle={{ backgroundColor: '#9700b9' }}
          icon={{ name: 'person', type: 'react-feather', color: 'black' }}
        />
      </View>
      <View style={styles.bottomTwoThird}>
        <View style={styles.UserProfileListStyle}>
          <FlatList
            data={userProfileData}
            renderItem={renderItem}
            keyExtractor={(item) => item.IconName}
          />
        </View>
        <View style={{ flex: 2.4 }}>
          <View style={styles.switchViewStyle}>
            <Text style={styles.switchTextStyle}>Use Phone Security for login</Text>
            <Switch value={isEnabled} onValueChange={(value) => toggleHandler(value)} />
          </View>
          <Button
            buttonStyle={{ borderRadius: 30, padding: 20, marginTop: 80 }}
            title="Edit Profile"
            onPress={editProfileHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topThird: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
  },
  bottomTwoThird: {
    flex: 4,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  UserNameStyle: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: primaryFontFamily,
  },
  UserProfileItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  UserProfileListStyle: {
    marginTop: 80,
    flex: 1.6,
  },
  UserProfileTextStyle: {
    marginLeft: 40,
    fontSize: 20,
  },
  switchViewStyle: {
    flexDirection: 'row',
  },
  switchTextStyle: {
    marginTop: 5,
    paddingRight: 20,
    marginLeft: -20,
    fontSize: 15,
  },
});
