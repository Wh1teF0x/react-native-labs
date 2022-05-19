import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  Button, Headline, HelperText, TextInput, useTheme
} from 'react-native-paper';
import PredictionBlock from './predictionBlock';
import RecommendationBlock from './recommendationBlock';

const RelaxApp = () => {
  const [user, setUser] = useState({
    name: '', password: '', wrongInput: false, loggedIn: false
  });
  const [hidePassword, setHidePassword] = useState(true);
  const { colors } = useTheme();

  const login = () => {
    if (user.name === 'admin' && user.password === 'admin') {
      setUser({ ...user, wrongInput: false, loggedIn: true });
    } else {
      setUser({ ...user, wrongInput: true, loggedIn: false });
    }
  };

  useEffect(() => {
    if (!user.loggedIn) {
      setUser({
        name: '', password: '', wrongInput: false, loggedIn: false
      });
      setHidePassword(true);
    }
  }, [user.loggedIn]);

  return (
    <View style={{ backgroundColor: colors.background, height: '100%' }}>
      {user && !user.loggedIn ? (
        <View>
          <TextInput
            label="Name"
            id="name"
            onChangeText={(value) => setUser({ ...user, wrongInput: false, name: value })}
          />
          <TextInput
            label="Password"
            secureTextEntry={hidePassword}
            onChangeText={(value) => setUser({ ...user, wrongInput: false, password: value })}
            right={(
              <TextInput.Icon
                onPress={() => setHidePassword(!hidePassword)}
                name={hidePassword ? 'eye' : 'eye-off'}
              />
                        )}
          />
          <HelperText type="error" visible={user.wrongInput}>
            Не угадал, попробуй еще раз
          </HelperText>
          <Button mode="contained" onPress={login}>Login</Button>
        </View>
      ) : (
        <ScrollView>
          <Headline style={{
            fontWeight: 'bold',
            paddingLeft: 20,
            paddingBottom: 10,
            color: colors.primary,
            textTransform: 'capitalize'
          }}
          >
            {user.name}
          </Headline>
          <RecommendationBlock />
          <PredictionBlock />
        </ScrollView>
      )}
    </View>
  );
};

export default RelaxApp;
