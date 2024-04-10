import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

type HighlightingBoxProps = {
 isTranslating: boolean;
};

const HighlightingBox: React.FC<HighlightingBoxProps> = ({ isTranslating }) => {
  const opacity = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
     Animated.timing(opacity, {
       toValue: isTranslating ? 1 : 0, //1 if True, 0 if else
       duration: 200, //duration
       useNativeDriver: true,
     }).start();
  }, [isTranslating, opacity]);
 
  return (
     <Animated.View style={[styles.highlightingBox, { opacity }]}></Animated.View>
  );
 };

const styles = StyleSheet.create({
 highlightingBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(254, 122, 54, 1)',
    borderRadius: 10,
    zIndex: -1,
 },
});

export default HighlightingBox;