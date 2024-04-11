import React, { useState, Component, useEffect} from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
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
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const containerMargin = screenHeight * 0.1; //8% of screen height

    const [isRecording, setRecording] = useState(false);
    const [isSpeaking, setSpeaking] = useState(true);

    const speechStartHandler = () => {
        console.log('speech has started')
    }

    const speechEndHandler = () => {
        setRecording(false)
        console.log('Speech has ended');
    }

    const speechResultHandler = (e: any) => {
        console.log('voice event: ', e);
        if (e.value && e.value.length > 0) {
            setText1(e.value[0]);
        }
    }

    const speechErrorHandler = (e : any) => {
        //ignoring no inout detected.
        if (e.code === 'recognition_fail' && e.message === '1110/No speech detected') {
            return;
        }
        else{
            console.log(e);
        }
    }

    const startRecording = async ()=> {
        setRecording(true);
        try{
            await Voice.start('en_US');
        }catch(error){
            console.error(error);
        }
    }

    const stopRecording = async ()=> {
        try{
            await Voice.stop();
            setRecording(false);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() =>{
        //voice handler events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechError = speechErrorHandler;
        Voice.onSpeechResults = speechResultHandler;

        return ()=>{
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])


    const handlePress = () => {
        Alert.alert('Button is pressed')
    }

    const handlePressLang1 = () => {
        setIsTranslating1(prevIsTranslating1 => {
            const newIsTranslating1 = !prevIsTranslating1;
            if (newIsTranslating1) {
                setIsTranslating2(false);
                startRecording();
                Alert.alert('Lang 1 Translation started');
            } else {
                stopRecording();
                Alert.alert('Lang 1 Translation stopped');
            }
            return newIsTranslating1;
        });
    };

    const handlePressLang2 = () => {
        setIsTranslating2(prevIsTranslating2 => {
            const newIsTranslating2 = !prevIsTranslating2;
            if (newIsTranslating2) {
                setIsTranslating1(false);
                startRecording();
                Alert.alert('Lang 2 Translation started');
            } else {
                stopRecording();
                Alert.alert('Lang 2 Translation stopped');
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
                    //onPress={startRecording}
                    onPress = {handlePress}
                    >
                    <Text>Start Voice</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={mainStyle.button}
                    //onPress={stopRecording}
                    onPress={handlePress}
                    >
                    <Text>End Voice</Text>
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
        padding: 10,
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