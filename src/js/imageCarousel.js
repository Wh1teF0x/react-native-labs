import React from 'react';
import {
  Dimensions, StyleSheet, View, Image
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useTheme } from 'react-native-paper';

const SLIDER_WIDTH = Dimensions.get('window').width + 60;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  container: {
    borderRadius: 8,
    elevation: 7,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
});

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={item}
        style={styles.image}
      />
    </View>
  );
};

const CarouselCards = ({ items }) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const { colors } = useTheme();

  return (
    <View style={styles.view}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={items}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(_index) => setIndex(_index)}
        useScrollView
      />
      <Pagination
        dotsLength={items.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{ ...styles.dotStyle, backgroundColor: colors.onSurface }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots
      />
    </View>
  );
};

export default CarouselCards;
