import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-snap-carousel';

import EnglishToSpanishScreen from './EnglishtoSpanish.js';
import SpanishToEnglishScreen from './SpanishToEnglish.js';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    // Sample data for the carousel
    const carouselItems = [
        { text: 'English Translation' },
        { text: 'Spanish Translation' },
    ];

    // Render method for the carousel items
    const renderItem = ({ item, index }: { item: any, index: number }) => {
        // Determine the screen to navigate to based on the item
        const screen = item.text === 'English Translation' ? 'EnglishToSpanishScreen' : 'SpanishToEnglishScreen';
    
        return (
            <TouchableOpacity
                style={styles.carouselItem}
                onPress={() => navigation.navigate(screen)}
            >
                <Text>{item.text}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={300}
                itemWidth={300}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselItem: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
});