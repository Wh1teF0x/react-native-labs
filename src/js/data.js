import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (component, session, value) => {
  const currentData = await getData(component);
  const jsonValue = JSON.stringify({
    ...currentData,
    [session]: value
  });
  await AsyncStorage.setItem(component, jsonValue);
};

export const getData = async (component) => {
  const jsonValue = await AsyncStorage.getItem(component);
  return jsonValue != null ? JSON.parse(jsonValue) : {};
};
