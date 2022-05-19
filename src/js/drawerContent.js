import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  DarkTheme, DefaultTheme, Drawer, Switch, Text, Title, TouchableRipple
} from 'react-native-paper';
import { ThemeContext } from './appContextProvider';

const DrawerContent = (props) => {
  const { navigation, state } = props;
  const { theme, changeTheme } = useContext(ThemeContext);
  const [themeSwitch, toggleThemeSwitch] = useState(false);
  const currentRoute = state.routeNames[state.index];
  const navigateTo = (item) => {
    navigation.navigate(item);
  };

  useEffect(() => {
    if (themeSwitch) {
      changeTheme(DarkTheme);
    } else {
      changeTheme(DefaultTheme);
    }
  }, [changeTheme, themeSwitch]);

  return (
    <DrawerContentScrollView style={{ backgroundColor: theme.colors.surface }} {...props}>
      <View
        style={{ flex: 1 }}
      >
        <Title style={{
          marginTop: 20,
          marginLeft: 20,
          fontWeight: 'bold',
        }}
        >
          Kuchynski D.I. Labs
        </Title>
        <Drawer.Section style={{ marginTop: 15, }}>
          <Drawer.Item
            icon="cat"
            label="Pop The cat"
            active={currentRoute === 'popTheCat'}
            onPress={() => navigateTo('popTheCat')}
          />
          <Drawer.Item
            icon="account"
            label="Random people"
            active={currentRoute === 'randomPeople'}
            onPress={() => navigateTo('randomPeople')}
          />
          <Drawer.Item
            icon="telescope"
            label="Relax App"
            active={currentRoute === 'relaxApp'}
            onPress={() => navigateTo('relaxApp')}
          />
          <Drawer.Item
            icon="information"
            label="Info"
            active={currentRoute === 'info'}
            onPress={() => navigateTo('info')}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => toggleThemeSwitch(!themeSwitch)}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}
            >
              <Text>Dark mode</Text>
              <View pointerEvents="none">
                <Switch value={themeSwitch} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
