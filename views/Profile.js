import { Avatar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.topThird}>
        <Text>Raahil Amarshi</Text>
        <Avatar
          size={70}
          rounded
          containerStyle={{ backgroundColor: '#9700b9' }}
          icon={{ name: 'person', type: 'react-feather', color: 'black' }}
        />
      </View>
      <View style={styles.bottomTwoThird}></View>
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
    borderBottomEndRadius: 200
  },
  bottomTwoThird: {
    flex: 3
  },
});
