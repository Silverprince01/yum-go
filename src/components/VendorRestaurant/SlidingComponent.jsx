import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

export const SlidingComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    setIsVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start(() => {
      setIsVisible(false);
    });
  };

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        slideOut();
      }, 3000); // Slide out after 3 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: [
          {
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [200, 0],
            }),
          },
        ],
      }}
    >
      {isVisible && (
        <View
          style={{
            backgroundColor: 'lightblue',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text>Your Sliding Component Content</Text>
        </View>
      )}
    </Animated.View>
  );
};

