import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import { Icon } from '@rneui/themed';
import { primaryColor } from '../GlobalVariables';

// import Drawer from './Drawer';
import NewEntry from '../views/NewEntry';
import Registration from '../views/Registration';
import Home from '../views/Home';
import Profile from '../views/Profile';
import UpdateEntry from '../views/UpdateEntry';


const Routes = () => {

  const { Screen, Navigator } = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Navigator
      initialRouteName="Authenticate"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false
        // drawerLabelStyle: { marginLeft: -15, fontSize: 18},
        // drawerActiveBackgroundColor: primaryColor,
        // drawerActiveTintColor: 'black'
      }}
      // drawerContent={(props) => <Drawer {...props} />}
    >
      <Screen
        name="New Entry"
        component={NewEntry}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          // drawerIcon: () => <Icon name="add" />,
          // headerLeft: () => (
          //   <Icon
          //     name="chevron-left"
          //     size={35}
          //     onPress={() => navigation.goBack() }
          //   />
          // )
        }}
      />
      <Screen
        name="Update Entry"
        component={UpdateEntry}
        options={{
          headerTitleStyle: styles.headerTitleStyle
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleStyle: styles.headerTitleStyle
        }}
      />
      <Screen
        name="Authenticate"
        component={Registration}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Screen
        name="My Closet"
        component={Home}
        options={{
          headerLeft: () => (
            <Icon
              name="person"
              size={35}
              onPress={() => navigation.navigate('Profile') }
            />
          ),
          headerRight: () => (
            <Icon
              name="add"
              size={35}
              onPress={() => navigation.navigate('New Entry')}
            />
          ),
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({
  // headerStyle: {
  //   backgroundColor: primaryColor,
  // },
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});
