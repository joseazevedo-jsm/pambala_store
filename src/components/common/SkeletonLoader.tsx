import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  useAnimatedStyle, 
  Easing 
} from "react-native-reanimated";
import { colors } from "../../styles/colors";

interface SkeletonLoaderProps {
  width: number;
  height: number;
  borderRadius?: number;
  style?: object;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius = 4,
  style,
}) => {
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1, // Repeat indefinitely
      true // Reverse animation
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, backgroundColor: colors.neutralLight },
        animatedStyle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
  },
});

export default SkeletonLoader;