import React, { useRef, useState } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";

const { width: screenWidth } = Dimensions.get("window");

interface CarouselProps {
  data: { id: string; imageUrl: string }[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  autoplay = false,
  autoplayInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setActiveIndex(nextIndex);
      }, autoplayInterval);
    }
    return () => clearInterval(interval);
  }, [activeIndex, autoplay, autoplayInterval, data.length]);

  const renderItem = ({ item }: { item: { id: string; imageUrl: string } }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth * 0.6, // Adjust height as needed
  },
  slide: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: spacing.sm,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: spacing.xs,
  },
  activeDot: {
    backgroundColor: colors.brandPrimary,
  },
  inactiveDot: {
    backgroundColor: colors.neutralLight,
  },
});

export default Carousel;
