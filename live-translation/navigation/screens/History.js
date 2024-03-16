import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from "react-native";
import { mainStyle } from '../styles/MainStyle.js'; 

export default function HistoryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate('Home')}>All History</Text>
            <Text>Live Translation History</Text>
            <Text>Typing Translation History</Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B4242',
    },
    view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#1B4242'
    },
    text: {
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    }
});
