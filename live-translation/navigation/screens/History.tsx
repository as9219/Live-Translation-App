import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HistoryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            
            <Text onPress={() => navigation.navigate('Home')} style={styles.heading}><Ionicons name="time" color='ghostwhite'></Ionicons>  All History</Text>
            <View>

            </View>
            <Text>Live Translation History</Text>
            <Text>Typing Translation History</Text>
        </View>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#1B4242',
    },
    view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#1B4242'
    },
    heading: {
        fontWeight: 'bold',
        color: 'ghostwhite',
        fontSize: 30,
        paddingTop: 60,
        paddingLeft: 10,
    },
    text: {
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    }
});
