import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import NewEntry from '../views/NewEntry';
import Registration from '../views/Registration';
import Home from '../views/Home';
import { Icon } from '@rneui/themed';
import { primaryColor } from '../GlobalVariables';

const Routes = () => {
  const { Screen, Navigator } = createNativeStackNavigator();

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true, headerShadowVisible: false }}
    >
      <Screen
        name="New Password Entry"
        component={NewEntry}
        options={{ headerTitleStyle: styles.headerStyle }}
      />
      <Screen
        name="PasswordCloset Register"
        component={Registration}
        options={{ headerTitleStyle: styles.headerStyle }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <Icon name="menu" size={35} onPress={() => alert('open menu')} />,
          headerRight: () => (
            <Icon name="add" size={35} onPress={() => alert('setup go to new entry')} />
          ),
          headerTitleStyle: styles.headerStyle,
        }}
      />
    </Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});
