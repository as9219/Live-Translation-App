import React from 'react';
import { View, StyleSheet } from 'react-native';

type HighlightingBoxProps = {
 isTranslating1: boolean;
 isTranslating2: boolean;
 highlightBox: 'first' | 'second';
};

const HighlightingBox: React.FC<HighlightingBoxProps> = ({ isTranslating1, isTranslating2, highlightBox }) => {
  return (
    <>
      {highlightBox === 'first' && isTranslating1 && (
        <View style={styles.highlightingBox}></View>
      )}
      {highlightBox === 'second' && isTranslating2 && (
        <View style={styles.highlightingBox}></View>
      )}
    </>
 );
};

const styles = StyleSheet.create({
 highlightingBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    zIndex: -1,
 },
});

export default HighlightingBox;