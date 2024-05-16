import React, { useState, Component, useEffect} from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView} from 'react-native';
import { Dimensions } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import HighlightingBox from '../misc/HighlightingBox.tsx';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Voice from '@react-native-community/voice';
import AudioRecorder from '../misc/AudioRecorder.tsx';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    const [text1, setText1] = useState('');

    const [isTranslating1, setIsTranslating1] = useState(false);
    const [isTranslating2, setIsTranslating2] = useState(false);

    
    
    const containerMargin = screenHeight * 0.1; //8% of screen height

    const [translatingNumber, setTranslatingNumber] = useState(0); // 0 - Eng, 1 - Spa

    const handleRestart = () => {
        Alert.alert('Restart Button is pressed')
    }

    const handlePressLang1 = () => {
        setIsTranslating2(false);
        setIsTranslating1(prevIsTranslating1 => {
            const newIsTranslating1 = !prevIsTranslating1;
            if (newIsTranslating1) {
                setTranslatingNumber(0);
                //rtRecording();
                //setText1('')
            } else {
                setTranslatingNumber(1);
                // stopRecording();
                // playRecording();

            }
            return newIsTranslating1;
        });
    };

    return (
        <View style={mainStyle.mainContainer}>
            <StatusBar barStyle="light-content" />
            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <HighlightingBox isTranslating={isTranslating1} />
                <SafeAreaView style={{ flex: 1 }}>
                    <AudioRecorder />
                </SafeAreaView>
                <View style={[mainStyle.ButtonContainer]}>
                    <TouchableOpacity
                        onPress={handleRestart}
                        style={mainStyle.button}
                        >
                        <Text>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleRestart}
                        style={mainStyle.button}
                        >
                        <Text>Transelate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


//Styles of Homepage
const mainStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#0B2447',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    langContainer: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        padding: 15,
        borderRadius: 10,
        height: screenHeight * 0.8,
    },
    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        width: '100%',
        height: '80%',
        backgroundColor: '#19376D',
        color: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    view: {
        flex: 1, 
        backgroundColor: '#393053'
    },
    text: {
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    },
    button: {
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: '#455A64',
        borderWidth: 1,
    },
});