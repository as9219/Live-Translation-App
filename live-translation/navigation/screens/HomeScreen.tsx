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

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, "Home">;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation } : {navigation : HomeScreenNavigationProp}) {

    const containerMargin = screenHeight * 0.1; //8% of screen height

    const translate = () => {
        console.log('Translate Button is pressed');
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
                            style={audioRecorderStyles.btn}
                            onPress={translate}
                        >
                            <Text>Translate</Text>
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