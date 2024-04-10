import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import HighlightingBox from '../misc/HighlightingBox.tsx';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isTranslating1, setIsTranslating1] = useState(false);
    const [isTranslating2, setIsTranslating2] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const containerMargin = screenWidth * 0.01; //10% of screen width


    const handlePress = () => {
        alert('Button is pressed')
    }

    const handlePressLang1 = () => {
        setIsTranslating1(prevIsTranslating1 => {
            const newIsTranslating1 = !prevIsTranslating1;
            if (newIsTranslating1) {
                setIsTranslating2(false);
                alert('Lang 1 Translation started');
            } else {
                alert('Lang 1 Translation stopped');
            }
            return newIsTranslating1;
        });
    };

    const handlePressLang2 = () => {
        setIsTranslating2(prevIsTranslating2 => {
            const newIsTranslating2 = !prevIsTranslating2;
            if (newIsTranslating2) {
                setIsTranslating1(false);
                alert('Lang 2 Translation started');
            } else {
                alert('Lang 2 Translation stopped');
            }
            return newIsTranslating2;
        });
    };

    return (
        <View style={mainStyle.mainContainer}>
            <StatusBar barStyle="light-content" />
            <View style={mainStyle.ButtonContainer}>
                <TouchableOpacity
                    style={mainStyle.button}
                    onPress={handlePress}
                    >
                    <Text>Save Conversation</Text>
                </TouchableOpacity>
            </View>

            <View style={[mainStyle.ButtonContainer, { marginTop: containerMargin }]}>
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
                <HighlightingBox isTranslating1={isTranslating1} isTranslating2={isTranslating2} highlightBox={isTranslating1 ? 'second' : 'first'} />
                <TextInput
                    style={mainStyle.textInput}
                    onChangeText={setText1}
                    value={text1}
                    placeholder="Enter text here"
                    placeholderTextColor={'#FFFFFF'}
                    readOnly={!isTranslating1} 
                    multiline={true}
                />
                <TouchableOpacity
                    style={[
                        mainStyle.button,
                        { backgroundColor: isTranslating1 ? '#FF5722' : '#4CAF50' },
                    ]}
                        onPress={handlePressLang1}
                    >
                    <Text>{isTranslating1 ? 'Stop Translation' : 'Translate'}</Text>
                </TouchableOpacity>
            </View>

            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <HighlightingBox isTranslating1={isTranslating1} isTranslating2={isTranslating2} highlightBox={isTranslating2 ? 'first' : 'second'} />
                <TextInput
                    style={mainStyle.textInput}
                    onChangeText={setText2}
                    value={text2}
                    placeholder="Translated text will appear here"
                    placeholderTextColor={'#FFFFFF'}
                    readOnly={!isTranslating2} 
                    multiline={true}
                />
                <TouchableOpacity
                    style={[
                        mainStyle.button,
                        { backgroundColor: isTranslating2 ? '#FF5722' : '#4CAF50' },
                    ]}
                        onPress={handlePressLang2}
                    >
                    <Text>{isTranslating2 ? 'Stop Translation' : 'Translate'}</Text>
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
        width: '95%',
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#18122B',
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
        padding: 5,
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