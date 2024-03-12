import * as React from 'react';
import { View, Text } from 'react-native';
import { mainStyle } from '../styles/MainStyle.js'; 

export default function AudioScreen({ navigation }) {
    return (
        <View style={mainStyle.view}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={mainStyle.text}>Audio Screen</Text>
        </View>
    );
}
