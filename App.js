import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect } from 'react';

import HideKeyboard from './components/HideKeyboard';

import { primaryColor } from './GlobalVariables';
import NewEntry from './views/NewEntry';
import Registration from './views/Registration';
import Home from './views/Home';
import { Icon } from '@rneui/themed';
import Routes from './navigation/Routes';

export default function App() {
  return (
    <HideKeyboard>
      <View style={styles.appContainer}>
        <NavigationContainer theme={myTheme}>
          <Routes />
        </NavigationContainer>
      </View>
    </HideKeyboard>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 0,
    flex: 1,
    backgroundColor: primaryColor,
  },
});

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: primaryColor,
  },
};
