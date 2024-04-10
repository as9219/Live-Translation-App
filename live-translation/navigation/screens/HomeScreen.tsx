import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const containerMargin = screenWidth * 0.1; // 10% of the screen width


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
            <View style={[mainStyle.ButtonContainer, { marginTop: 60 }]}>
                <TouchableOpacity
                    style={mainStyle.button}
                    onPress={handlePress}
                    >
                    <Text>Erase Current</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={mainStyle.button}
                        onPress={handlePress}
                    >
                    <Text>Redo Current</Text>
                </TouchableOpacity>
            </View>

            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <TextInput
                    style={mainStyle.textInput}
                    onChangeText={setText1}
                    value={text1}
                    placeholder="Enter text here"
                    placeholderTextColor={'#FFFFFF'}
                    readOnly={!isTranslating} 
                    multiline={true}
                />
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

            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <TextInput
                    style={mainStyle.textInput}
                    onChangeText={setText2}
                    value={text2}
                    placeholder="Translated text will appear here"
                    placeholderTextColor={'#FFFFFF'}
                    readOnly={!isTranslating} 
                    multiline={true}
                />
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

            <View style={mainStyle.ButtonContainer}>
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
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    langContainer: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ghostwhite',
        padding: 10,
        borderRadius: 10
    },
    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 10,
        //margin: 10,
        padding: 10,
        width: '100%',
        height: '80%',
        backgroundColor: '#18122B',
        color: '#FFFFFF',
    },
    button: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#9b7dff'
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