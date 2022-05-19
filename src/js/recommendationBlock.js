import React, { useState } from 'react';
import { Chip, Card, Paragraph } from 'react-native-paper';
import { View } from 'react-native';
import CatPic from '../static/relaxApp/cat.jpg';

const RecommendationBlock = () => {
  const text = [
    'Выберите эмодзи выше и я дам вам полезный совет',
    'Вы чувствуете себя хорошо, чтобы чувствовать себя еще лучше - погладьте котика!',
    'Вы чувствуете себя плохо, чтобы почувствовать себя лучше - погладьте котика!',
    'Вы сами не знаете что чувствуете, чтобы разобраться в себе - погладьте котика!'
  ];
  const [activeIcon, setActiveIcon] = useState(0);
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
        <Chip icon="emoticon" selected={activeIcon === 1} onPress={() => setActiveIcon(1)}>Хорошо</Chip>
        <Chip icon="emoticon-angry" selected={activeIcon === 2} onPress={() => setActiveIcon(2)}>Я злость</Chip>
        <Chip icon="emoticon-confused" selected={activeIcon === 3} onPress={() => setActiveIcon(3)}>Нейтрально</Chip>
      </View>
      <Card style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
        {activeIcon > 0 && <Card.Cover source={CatPic} />}
        <Paragraph style={{ padding: 10 }}>{text[activeIcon]}</Paragraph>
      </Card>
    </View>
  );
};

export default RecommendationBlock;
