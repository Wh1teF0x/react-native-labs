import { Pressable, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Headline, Portal, ProgressBar, useTheme
} from 'react-native-paper';
import CatImage from './catImage';
import GroupButton from './groupButton';
import { storeData } from './data';

const COMPONENT_ID = 'popTheCat';

const CatClicker = ({ route }) => {
  const { sessionId } = route.params;
  const { colors } = useTheme();
  const [popState, setPopState] = useState(0);
  const [rageState, setRageState] = useState(0.0);
  const [popScore, setPopScore] = useState(0);
  const rageTimer = useRef();

  useEffect(() => {
    const progressTime = 2000;
    const ticksCount = 20;
    if (popScore && popScore % 15 === 0) {
      setRageState(1.0);
      clearInterval(rageTimer.current);
      rageTimer.current = setInterval(() => {
        setRageState((oldRage) => oldRage - 1 / ticksCount);
      }, progressTime / ticksCount);
    }
    if (rageState <= 0) {
      clearInterval(rageTimer.current);
    }
  }, [popScore, popState, rageState]);

  useEffect(() => {
    storeData(COMPONENT_ID, sessionId, popScore);
  }, [sessionId, popScore]);

  return (
    <Portal.Host>
      <View style={{ backgroundColor: colors.background }}>
        <ProgressBar progress={rageState} visible={rageState > 0} />
        <Headline style={{
          fontWeight: 'bold',
          paddingLeft: 20,
        }}
        >
          {`You poped the cat ${popScore} times!`}
        </Headline>
        <Pressable
          onPress={() => {
            setPopScore(popScore + 1);
          }}
          onPressIn={() => {
            setPopState(1);
          }}
          onPressOut={() => {
            setPopState(0);
          }}
        >
          {CatImage(popState, rageState)}
        </Pressable>
        <GroupButton
          shareString={`My Pop The Cat score: ${popScore}, try to beat me!`}
          componentId={COMPONENT_ID}
        />
      </View>
    </Portal.Host>
  );
};

export default CatClicker;
