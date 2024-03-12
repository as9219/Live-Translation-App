import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={defaultStyle.view}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={defaultStyle.text}>History Screen</Text>
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'royalblue'
    },

    text: {
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    },
});
