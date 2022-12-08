import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Text>Custom Text</Text>
      </View>
    </View>
  );
};

export default Drawer;
