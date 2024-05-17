import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView} from 'react-native';
import { Dimensions } from 'react-native';
import { RootTabParameterList } from '../MainContent.js';
import HighlightingBox from '../misc/HighlightingBox.tsx'; // unused, but still can used if needed
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Voice from '@react-native-community/voice'; // unused import
import AudioRecorderRaw from '../misc/AudioRecorderRaw.tsx';
import AudioRecorderTranslated from '../misc/AudioRecorderTranslated.tsx';
import { audioRecorderStyles } from '../misc/AudioRecorderRaw.tsx';

import { Client } from "@gradio/client"; //import is faulty

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {

    const containerMargin = screenHeight * 0.1; //8% of screen height

    // does not work
    const translate = async () => {
        //process: 
        // 1) send raw.m4a from filepath to API server (depending on platform)
        // 2) recieve from API server (depending on platform place .wav file in correct dir)
        // 3) play translated.wav
        // maybe we can implement the pause feature??
        console.log('Translate Button is pressed');
        // const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
        // const exampleAudio = await response_0.blob();
                                
        // const app = await Client.connect("https://facebook-seamless-m4t-v2-large.hf.space/--replicas/loi3j/");
        // const result = await app.predict("/s2st", [
        //                 exampleAudio, 	// blob in 'Input speech' Audio component		
        //                 'Afrikaans', // string  in 'Source language' Dropdown component		
        //                 'Hindi', // string  in 'Target language' Dropdown component
        //     ]);

        //     console.log(result);
    }


    return (
        <View style={mainStyle.mainContainer}>
            <StatusBar barStyle="light-content" />
            <View style={[mainStyle.langContainer, { marginBottom: containerMargin }]}>
                {/* <HighlightingBox isTranslating={isTranslating1} /> */}
                <SafeAreaView style={{ flex: 1 }}>
                    <AudioRecorderRaw />
                    <View style={[mainStyle.ButtonContainer]}>
                        <TouchableOpacity
                            style={[audioRecorderStyles.btn, { width: screenWidth * 0.6 }]}
                            onPress={translate}
                        >
                            <Text style={{alignSelf:'center'}}>Translate</Text>
                        </TouchableOpacity>
                    </View>
                    <AudioRecorderTranslated />
                </SafeAreaView>
            </View>
        </View>
    );
}


//Styles of Homepage
const mainStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#153448',
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