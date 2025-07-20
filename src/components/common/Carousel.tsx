import React, { useRef, useState } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Text } from "react-native";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { typography } from "../../styles/typography";

const { width: screenWidth } = Dimensions.get("window");

interface CarouselProps {
  data: { id: string; imageUrl: string; title?: string; }[]; // Added optional title
  autoplay?: boolean;
  autoplayInterval?: number;
  style?: any; // Allow style prop
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  autoplay = false,
  autoplayInterval = 3000,
  style, // Accept style prop
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

  const renderItem = ({ item }: { item: { id: string; imageUrl: string; title?: string; } }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      {item.title && (
        <View style={styles.overlay}>
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, style]}> {/* Merge styles */}
      <FlatList
        contentContainerStyle={[
          { flexGrow: 1 },
          style && (style.paddingHorizontal || style.marginHorizontal)
            ? {
                paddingHorizontal: style.paddingHorizontal || style.marginHorizontal || 0,
              }
            : null,
        ]}
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
    borderRadius: 16, // Applied border radius
    overflow: 'hidden', // Ensure content respects border radius
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.spacingMd,
  },
  titleText: {
    ...typography.display,
    color: colors.surfaceWhite,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: spacing.spacingSm, // Updated spacing
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: spacing.xs,
  },
  activeDot: {
    backgroundColor: colors.brandPurpleVibrant, // Updated color
  },
  inactiveDot: {
    backgroundColor: colors.borderNeutral, // Updated color
  },
});

export default Carousel;
