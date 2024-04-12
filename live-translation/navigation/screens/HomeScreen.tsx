import React, { useState, Component, useEffect} from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import HighlightingBox from '../misc/HighlightingBox.tsx';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Voice from '@react-native-community/voice';
import { languages } from '../misc/languages.tsx';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isTranslating1, setIsTranslating1] = useState(false);
    const [isTranslating2, setIsTranslating2] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const containerMargin = screenHeight * 0.1; //8% of screen height

    const fromLanguage = 'en-GB';
    const toLanguage = 'es-ES';
    const [translationDirection, setTranslationDirection] = useState<'en-GB to es-ES' | 'es-ES to en-GB'>('en-GB to es-ES');
    const [isTranslating, setIsTranslating] = useState(false);

    const [isRecording, setRecording] = useState(false);
    const [isSpeaking, setSpeaking] = useState(true);


    const translate = () => {
        if (!text1 && translationDirection === 'es-ES to en-GB') {
            setText1('');
            return;
        }
        else if (!text1 && translationDirection === 'en-GB to es-ES') {
            setText2('');
            return;
        } 

        setIsTranslating(true);

        // const [fromLang, toLang] = translationDirection.split(' to ');
        // const apiUrl = `https://api.mymemory.translated.net/get?q=${text1}&langpair=${fromLang}|${toLang}`;

        const [fromLang, toLang] = translationDirection.split(' to ');
        const apiUrl = `https://api.mymemory.translated.net/get?q=${translationDirection === 'en-GB to es-ES' ? text1 : text2}&langpair=${fromLang}|${toLang}`;



        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log('API Data: ', data);
                if (translationDirection === 'en-GB to es-ES') {
                    setText2(data.responseData.translatedText);
                } else if (translationDirection === 'es-ES to en-GB') {
                    setText1(data.responseData.translatedText);
                }
                setIsTranslating(false);
            });
    };


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
            if (translationDirection === 'en-GB to es-ES') {
                setText1(e.value[0]);
            } else if (translationDirection === 'es-ES to en-GB') {
                setText2(e.value[0]);
            }
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

    const startRecording = async (language: string)=> {
        setRecording(true);
        try{
            await Voice.start(language);
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


    const handleSave = () => {
        Alert.alert('Save Button is pressed')
    }

    const handleUndo = () => {
        Alert.alert('Undo Button is pressed')
    }

    const handleClear = () => {
        setText1('')
        setText2('')
    }

    const handlePressLang1 = () => {
        setIsTranslating1(prevIsTranslating1 => {
            const newIsTranslating1 = !prevIsTranslating1;
            if (newIsTranslating1) {
                setIsTranslating2(false);
                setTranslationDirection('en-GB to es-ES');
                console.log(translationDirection);
                startRecording('en_US');
                
                //Alert.alert('Lang 1 Translation started');
            } else {
                stopRecording();
                translate();
                //Alert.alert('Lang 1 Translation stopped');
            }
            return newIsTranslating1;
        });
    };

    const handlePressLang2 = () => {
        setIsTranslating2(prevIsTranslating2 => {
            const newIsTranslating2 = !prevIsTranslating2;
            if (newIsTranslating2) {
                setIsTranslating1(false);
                setTranslationDirection('es-ES to en-GB');
                console.log(translationDirection);
                startRecording('es-US');
                
                //Alert.alert('Lang 2 Translation started');
            } else {
                stopRecording();
                translate();
                //Alert.alert('Lang 2 Translation stopped');
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
                    onPress={handleSave}
                    >
                    <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={mainStyle.button}
                    //onPress={startRecording}
                    onPress = {handleClear}
                    >
                    <Text>Clear Current</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={mainStyle.button}
                    //onPress={stopRecording}
                    onPress={handleUndo}
                    >
                    <Text>Undo</Text>
                </TouchableOpacity>
            </View>

            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <HighlightingBox isTranslating={isTranslating1} />
                <TextInput
                    style={mainStyle.textInput}
                    onChangeText={setText1}
                    value={text1}
                    placeholder="English Speech Here"
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
                    <Text>{isTranslating1 ? 'Stop Recording' : 'Start Recording'}</Text>
                </TouchableOpacity>
            </View>

            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                <HighlightingBox isTranslating={isTranslating2} />
                <TextInput
                    style={mainStyle.textInput}
                    onChangeText={setText2}
                    value={text2}
                    placeholder="Translated Language Here"
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
                    <Text>{isTranslating2 ? 'Stop Recording' : 'Start Recording'}</Text>
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