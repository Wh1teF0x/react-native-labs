import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  ActivityIndicator, Portal, Searchbar, Snackbar, useTheme
} from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { getData, storeData } from './data';
import GroupButton from './groupButton';
import ListItem from './listItem';

const COMPONENT_ID = 'randomPeople';

const RandomPeople = ({ route }) => {
  const { sessionId } = route.params;
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();
  const [peopleList, setPeopleList] = useState(null);
  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  let snackBarClosed = false;

  useEffect(() => {
    if (!peopleList) {
      getData(`${COMPONENT_ID}/data`).then((data) => {
        if (data && Object.keys(data).length) {
          setPeopleList(data.people);
          storeData(COMPONENT_ID, sessionId, data.people.length);
        } else {
          fetch('https://randomuser.me/api/?results=50')
            .then((r) => r.json())
            .then((result) => {
              storeData(`${COMPONENT_ID}/data`, 'people', result.results);
              storeData(COMPONENT_ID, sessionId, result.results.length);
              setPeopleList(result.results);
            });
        }
      });
    }
  }, [peopleList, isConnected, snackBarClosed, sessionId]);

  useEffect(() => {
    if (isConnected !== null && !isConnected && !snackBarClosed) {
      setSnackBarStatus(true);
    }
  }, [isConnected, snackBarClosed]);

  return (
    <Portal.Host>
      <View style={{ height: '100%', backgroundColor: colors.background }}>
        <Searchbar
          placeholder="Поиск"
          onChangeText={(v) => setSearchValue(v.toLowerCase())}
        />
        {peopleList && peopleList.length
          ? (
            <ScrollView>
              {peopleList.filter((item) => `${item.name.first}${item.name.last}${item.email}`.toLowerCase().includes(searchValue)).map((item) => <ListItem key={item.email} person={item} />)}
            </ScrollView>
          )
          : <ActivityIndicator animating size="large" style={{ padding: 20 }} color={colors.secondary} />}
        <Snackbar
          visible={snackBarStatus}
          onDismiss={() => {
            snackBarClosed = true;
          }}
          action={{
            label: 'close',
            onPress: () => {
              setSnackBarStatus(false);
            },
          }}
        >
          Нет интернета, пробую взять данные из кэша
        </Snackbar>
        <GroupButton
          componentId={COMPONENT_ID}
        />
      </View>
    </Portal.Host>
  );

};

export default RandomPeople;
