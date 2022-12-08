import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';

import NewEntry from '../views/NewEntry';
import Registration from '../views/Registration';
import Home from '../views/Home';
import { Icon } from '@rneui/themed';
import { primaryColor } from '../GlobalVariables';

import Drawer from './Drawer';

const Routes = () => {

  const { Screen, Navigator } = createDrawerNavigator();
  const navigation = useNavigation();

  return (
    <Navigator
      initialRouteName="My Closet"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        drawerLabelStyle: { marginLeft: -15, fontSize: 18},
        drawerActiveBackgroundColor: primaryColor,
        drawerActiveTintColor: 'black'
      }}
      drawerContent={(props) => <Drawer {...props} />}
    >
      <Screen
        name="New Entry"
        component={NewEntry}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          drawerIcon: () => <Icon name="add" />,
        }}
      />
      <Screen
        name="Authenticate"
        component={Registration}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          drawerIcon: () => <Icon name="login" />,
        }}
      />
      <Screen
        name="My Closet"
        component={Home}
        options={{
          drawerIcon: () => <Icon name="home" />,
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 10 }}
              name="menu"
              size={35}
              onPress={() => alert('add navigation') }
            />
          ),
          headerRight: () => (
            <Icon
              style={{ marginRight: 10 }}
              name="add"
              size={35}
              onPress={() => alert('setup go to new entry')}
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
