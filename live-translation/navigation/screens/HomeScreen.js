import * as React from 'react';
import { View, Text } from 'react-native';
import { mainStyle } from '../styles/MainStyle.js'; 

export default function HomeScreen({ navigation }) {
    return (
        <View style={mainStyle.view}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={mainStyle.text}>Home Screen</Text>
        </View>
    );
}
