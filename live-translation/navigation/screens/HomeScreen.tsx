import React, { useState, Component, useEffect} from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import HighlightingBox from '../misc/HighlightingBox.tsx';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Voice from '@react-native-community/voice';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isTranslating1, setIsTranslating1] = useState(false);
    const [isTranslating2, setIsTranslating2] = useState(false);
    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const containerMargin = screenWidth * 0.08; //10% of screen width

    //speech constants
    const speechStartHandler = (e: any)=> {
        console.log('speech start handler');
    }
    const speechEndHandler = (e: any)=> {
        setRecording(false);
        console.log('speech end handler');
    }
    const speechResultHandler = (e: any)=> {
        console.log('voice event: ', e);
    }
    const speechErrorHandler = e=> {
        console.log('error: ', e);
    }

    const startRecording = async (e: any)=>{
        try{
            await Voice.start('en-US');
        } catch {
            console.log('error: ', e)
        }
    }
    const stopRecording = async (e: any)=>{
        try{
            await Voice.stop();
            setRecording(false);
        } catch(error) {
            console.log('error: ', error)
        }
    }

    const stopSpeaking= ()=> {
        setSpeaking(false); 
    }

    useEffect(()=> {
        //voice handler events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultHandler; 
        Voice.onSpeechError = speechErrorHandler;

        return ()=>{
            //we need to destroy all the handlers when not in use
            Voice.destroy().then(Voice.removeAllListeners);
        }

    }, [])


    const handlePress = () => {
        alert('Button is pressed')
    }

    const handlePressLang1 = () => {
        setIsTranslating1(prevIsTranslating1 => {
            const newIsTranslating1 = !prevIsTranslating1;
            if (newIsTranslating1) {
                setIsTranslating2(false);
                alert('Lang 1 Translation started');
                startRecording;
            } else {
                stopRecording;
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
                
            </View>

            <View style={[mainStyle.ButtonContainer, { marginTop: containerMargin }]}>
                <TouchableOpacity
                    style={mainStyle.button}
                    onPress={handlePress}
                    >
                    <Text>Save</Text>
                </TouchableOpacity>
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
                <HighlightingBox isTranslating={isTranslating1} />
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
                        { backgroundColor: isTranslating1 ? '#A5D7E8' : '#576CBC' },
                    ]}
                        onPress={handlePressLang1}
                    >
                    <Text>{isTranslating1 ? 'Stop Translation' : 'Translate'}</Text>
                </TouchableOpacity>
            </View>

            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <HighlightingBox isTranslating={isTranslating2} />
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
                        { backgroundColor: isTranslating2 ? '#A5D7E8' : '#576CBC' },
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
        backgroundColor: '#19376D',
        color: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#576CBC',
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
    }
});