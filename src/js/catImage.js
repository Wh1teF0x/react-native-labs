import React from 'react';
import { Image, StyleSheet } from 'react-native';
import popOpen from '../static/popCat/pop_open.png';
import popOpenCursed from '../static/popCat/pop_open_cursed.png';
import popClose from '../static/popCat/pop_closed.png';
import popCloseCursed from '../static/popCat/pop_closed_cursed.png';

const styles = StyleSheet.create({
  catImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 200,
  },
});

const CatImage = (popState, rageState) => {
  const regular = [popClose, popOpen];
  const rage = [popCloseCursed, popOpenCursed];
  const requiredImage = rageState > 0 ? rage : regular;
  return (
    <Image source={requiredImage[popState]} style={styles.catImage} />
  );
};

export default CatImage;
