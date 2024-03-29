import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
//import { Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { Audio } from 'expo-av';



export default function TranslateScreen({ navigation }) {
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

    const [recording, setRecording] = useState(false);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            // Update currentDateTime with the current date
            setCurrentDateTime(new Date().toLocaleDateString());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clean up on component unmount
    }, []);

    useEffect(() => {
        // Set audio mode for iOS
        if (Platform.OS === 'ios') {
            (async () => {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                    playThroughEarpieceAndroid: false,
                    staysActiveInBackground: true,
                });
            })();
        }
    }, []);

    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') return;

            const recordingInstance = new Audio.Recording();
            await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recordingInstance.startAsync();
            setRecording(true);
            setSound(recordingInstance);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        try {
            await sound.stopAndUnloadAsync();
            setRecording(false);
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.innerContainer}>
                    <Text
                        onPress={() => navigation.navigate('Home')}
                        style={styles.text}>Translation Screen
                    </Text>

                    <View style={styles.chatContainer}>
                        <Text style={styles.dateTimeText}>{currentDateTime}</Text>
                    </View>
                    <View style={styles.parentInputContainer}>
                        <View style={styles.textInputContainer}>
                            {/* <Input
                                placeholder="Waveform Here"
                                placeholderTextColor={'white'}
                                inputContainerStyle={styles.textBox}
                                multiline={true}
                                // Allow multiline input for translation text
                                numberOfLines={1}
                            /> */}
                        </View> 
                        <TouchableOpacity style={styles.sendButton} onPress={recording ? stopRecording : startRecording}>
                            <Ionicons name={recording ? "mic-off-outline" : "mic-outline"} size={37}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#393053', //'#152f8d'
    },

    //implemented for KeyboardAvoidingView
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    chatContainer: {
        width: '90%',
        height: '75%',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#635985',
    },
    dateTimeText: {
        color: 'white', // Adjust the color as needed
        fontSize: 14, // Adjust the font size as needed
        marginTop: 10, 
        alignSelf: 'center',
    },
    parentInputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputContainer: {
        height: 60,
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#393053',
        shadowColor: '#000',
        borderRadius: 20,
        //shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    textBox: {
        borderBottomWidth: 0,
        paddingTop: 10,
        textAlign: 'left',
        maxHeight: 50,
        width: '100%',
    },
    sendButton: {
        backgroundColor: '#DBE7C9',
        borderRadius: 15,
        padding: 10,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    sendButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        alignItems: 'flex-start',
        marginTop: '15%',
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    }
});