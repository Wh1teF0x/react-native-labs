import React from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import CatClicker from './catClicker';
import InfoScreen from './infoScreen';
import DrawerContent from './drawerContent';
import RandomPeople from './randomPeople';
import AppContextProvider from './appContextProvider';
import RelaxApp from './relaxApp';

const Drawer = createDrawerNavigator();
const sessionId = new Date().getTime();

const Main = () => {
  const { colors } = useTheme();
  return (
    <AppContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary} />
        <Drawer.Navigator
          initialRouteName="Pop the cat"
          drawerContent={DrawerContent}
          screenOptions={{
            drawerStyle: {
              backgroundColor: colors.surface,
            },
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        >
          <Drawer.Screen
            name="popTheCat"
            component={CatClicker}
            initialParams={{ sessionId }}
            options={{
              title: 'Pop The Cat'
            }}
          />
          <Drawer.Screen
            name="randomPeople"
            component={RandomPeople}
            initialParams={{ sessionId }}
            options={{
              title: 'Random People'
            }}
          />
          <Drawer.Screen
            name="relaxApp"
            component={RelaxApp}
            initialParams={{ sessionId }}
            options={{
              title: 'Relax App'
            }}
          />
          <Drawer.Screen
            name="info"
            component={InfoScreen}
            initialParams={{ sessionId }}
            options={{
              title: 'Info'
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default Main;
