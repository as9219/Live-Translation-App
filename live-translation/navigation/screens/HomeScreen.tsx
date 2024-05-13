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

    let languages: Array<string>  = ['en-GB', 'es-ES']
    const [translatingNumber, setTranslatingNumber] = useState(0); // 0 - Eng, 1 - Spa
    //const [isTranslating, setIsTranslating] = useState(false);

    const [isRecording, setRecording] = useState(false);
    //const [isSpeaking, setSpeaking] = useState(true);

    const emptyInput = "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT"

    const translate = () => {
        if (translatingNumber === 0) {
            setText2('');
        } else if (translatingNumber === 1) {
            setText1('');
        }

        const textToTranslate = translatingNumber === 0 ? text1 : text2;
        const apiUrl = translatingNumber === 0 ? `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${languages[0]}|${languages[1]}` : 
        `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${languages[1]}|${languages[0]}`;
        
    
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log('Translated Text: ', data.responseData.translatedText)

                if (translatingNumber === 0) {
                    if(data.responseData.translatedText === emptyInput){
                        setText2('No Input Detected. Please try again');
                    }
                    else{
                        setText2(data.responseData.translatedText);
                    }
                    setIsTranslating1(false);

                } 
                else if (translatingNumber === 1) {
                    if(data.responseData.translatedText === emptyInput){
                        setText1('No Input Detected. Please try again');
                    }
                    else{
                        setText1(data.responseData.translatedText);
                    }
                    setIsTranslating2(false);
                }
            })
            .catch((error) => {
                console.error('Error found: ', error);
            });
    };
    
    const speechStartHandler = () => {
        console.log('Speech has started')
    }

    const speechEndHandler = () => {
        setRecording(false)
        console.log('Speech has ended');
    }

    const speechResultHandler = (e: any) => {
        console.log('voice event: ', e);
        if (e.value && e.value.length > 0) {
            if (translatingNumber === 0) {
                setText1(e.value[0]);
            } else if (translatingNumber === 1) {
                setText2(e.value[0]);
            }
        }
    }

    const speechErrorHandler = (e : any) => {
        //ignoring no input detected.
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
        setRecording(false);
        try{
            await Voice.stop();
            Voice.destroy().then(Voice.removeAllListeners);
        
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

    useEffect(() => {
        if (translatingNumber === 0) {
            console.log("Translating 0");
        }

        if (translatingNumber === 1) {
            console.log("Translating 1");
        }
    }, [translatingNumber])


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
        setIsTranslating2(false);
        setIsTranslating1(prevIsTranslating1 => {
            const newIsTranslating1 = !prevIsTranslating1;
            if (newIsTranslating1) {
                setTranslatingNumber(0);
                //setText1('')
                startRecording('en_US');
            } else {
                stopRecording();
                translate();
            }
            return newIsTranslating1;
        });
    };
    
    const handlePressLang2 = () => {
        setIsTranslating1(false);
        setIsTranslating2(prevIsTranslating2 => {
            const newIsTranslating2 = !prevIsTranslating2;
            if (newIsTranslating2) {
                setTranslatingNumber(1);
                //setText2('')
                startRecording('es_US');
            } else {
                stopRecording();
                translate();
            }
            return newIsTranslating2;
        });
    };

    // const speak = () => {
    //     Tts.speak('This is something I need for you to speak');
    // }
    
    //Main UI of homepage
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
                    <Text>{isTranslating1 ? 'Finish Recording' : 'Start Recording'}</Text>
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
                    <Text>{isTranslating2 ? 'Finish Recording' : 'Start Recording'}</Text>
                </TouchableOpacity>
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