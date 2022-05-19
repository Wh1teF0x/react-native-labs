import React from 'react';
import { View } from 'react-native';
import { Headline, Text, useTheme } from 'react-native-paper';
import ImageCarousel from './imageCarousel';
import cat1 from '../static/infoCats/cat1.jpg';
import cat2 from '../static/infoCats/cat2.jpg';
import cat3 from '../static/infoCats/cat3.jpg';

const InfoScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ height: '100%', backgroundColor: colors.background }}>
      <Headline style={{
        fontWeight: 'bold',
        paddingLeft: 20,
      }}
      >
        Тут должен быть гайд
      </Headline>
      <Text style={{ paddingLeft: 20, paddingBottom: 50 }}>
        Но я думаю тут и так все понятно, поэтому тут будут котики
      </Text>
      <ImageCarousel items={[cat1, cat2, cat3]} />
    </View>
  );
};

export default InfoScreen;
