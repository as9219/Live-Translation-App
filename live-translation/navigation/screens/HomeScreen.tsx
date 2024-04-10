import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
//import { mainStyle } from '../styles/MainStyle.js'; 
import { RootTabParameterList } from '../MainContent.js';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);

    const handlePress = () => {
        alert('Button is pressed');
    };

    const togglePress = () => {
        setIsTranslating(!isTranslating);
        if (isTranslating) {
            // Perform the translation action here
            alert('Translation started');
        } else {
            // Perform the stop translation action here
            alert('Translation stopped');
        }
    };

    return (
        <View style={mainStyle.mainContainer}>
            <StatusBar barStyle="light-content" />
            {/* <Text style={mainStyle.text}>Speech to Speech</Text> */}
            <TextInput
                style={mainStyle.textInput}
                onChangeText={setText1}
                value={text1}
                placeholder="Enter text here"
                placeholderTextColor={'#FFFFFF'}
            />
            <View style={mainStyle.middleButtonContainer}>
                <TouchableOpacity
                    style={mainStyle.button}
                    onPress={handlePress}
                    >
                    <Text>Inter Change</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        mainStyle.button,
                        { backgroundColor: isTranslating ? '#FF5722' : '#4CAF50' }, // Conditionally change color
                    ]}
                        onPress={togglePress}
                    >
                    <Text>{isTranslating ? 'Stop Translation' : 'Translate'}</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={mainStyle.textInput}
                onChangeText={setText2}
                value={text2}
                placeholder="Translated text will appear here"
                placeholderTextColor={'#FFFFFF'}
            />
            <View style={mainStyle.bottomButtonContainer}>
                <TouchableOpacity
                    style={mainStyle.button}
                    onPress={handlePress}
                    >
                    <Text>Save Conversation</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mainStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#393053',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    middleButtonContainer: {
        //height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bottomButtonContainer: {
        //height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        width: '80%',
        height: '30%',
        backgroundColor: '#18122B',
        color: '#FFFFFF',
    },
    button: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center'
    },
    view: {
        flex: 1, 
        backgroundColor: '#393053'
    },
    text: {
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    }
});