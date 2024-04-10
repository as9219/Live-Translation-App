import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import { languages } from '../misc/languages.tsx';
import ModalDropdown from 'react-native-modal-dropdown';


export default function LanguageTranslator() {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = 
        useState('en-GB');
    const [toLanguage, setToLanguage] = 
        useState('fa-IR');
 
    const translate = () => {
        if (!fromText) {
            setToText('');
            return;
        }
 
        setToText('Translating...');
 
        const apiUrl = `https://api.mymemory.translated.net/get?q=
        ${fromText}&langpair=${fromLanguage}|${toLanguage}`;
 
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setToText(data.responseData.translatedText);
                data.matches.forEach((data) => {
                    if (data.id === 0) {
                        setToText(data.translation);
                    }
                });
            });
    };
 
    const exchangeLanguages = () => {
        const tempText = fromText;
        const tempLang = fromLanguage;
 
        setFromText(toText);
        setToText(tempText);
        setFromLanguage(toLanguage);
        setToLanguage(tempLang);
    };
 
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Input 
                        placeholder="Enter text"
                        placeholderTextColor={'black'}
                        value={fromText}
                        onChangeText={(text) => 
                            setFromText(text)}
                        inputContainerStyle=
                            {styles.textInputContainer}
                        multiline={true} 
                        // Allow multiline input
                        numberOfLines={4} 
                        // Limit the number of lines shown (adjust as needed)
                    />
                    
                </View>
                <View style={styles.middleWrapper}>
                    <View style={styles.controls}>
                        <ModalDropdown
                            options={Object.values(languages)}
                            defaultValue={languages[fromLanguage]}
                            onSelect={(index, value) => {
                                setFromLanguage(Object.keys(languages).find(key => 
                                    languages[key] === value));
                            }}
                            style={styles.picker}
                        />
                        <TouchableOpacity style={styles.exchangeButton} 
                            onPress={exchangeLanguages}>
                            <Text style={styles.exchangeButtonText}>↔</Text>
                        </TouchableOpacity>
                        <ModalDropdown
                            options={Object.values(languages)}
                            defaultValue={languages[toLanguage]}
                            onSelect={(index, value) => {
                                setToLanguage(Object.keys(languages)
                                    .find(key => languages[key] === value));
                            }}
                            style={styles.picker}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={translate}>
                        <Text style={styles.buttonText}>Translate Text</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapper}>
                    <Input
                        placeholder="Translation"
                        placeholderTextColor={'black'}
                        value={toText}
                        inputContainerStyle={styles.translationTextContainer}
                        //disabled ?? why is this here
                        multiline={true}
                        // Allow multiline input for translation text
                        numberOfLines={4}
                        
                        // Limit the number of lines shown (adjust as needed)
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
        
    );
    //need to impelement 2 new buttons, one for opening previous translations(redirects to history page), and another for saving the translation
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#393053', //'#152f8d'
    },
    heading: {
        fontSize: 26, 
        fontWeight: 'bold', 
        color: 'ghostwhite',
    },
    wrapper: {
        width: '90%',
        height: '30%',
        padding: 20,
        marginTop: 20,
        backgroundColor: '#635985',
        borderRadius: 15,
        shadowColor: '#000',
        //shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    middleWrapper: {
        width: '90%',
        height: '20%',
        padding: 10,
        backgroundColor: '#9EC8B9',
        //borderWidth: 1,
        borderRadius: 15,
        marginTop: 20,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
    },
    picker: {
        height: 40,
        backgroundColor: '#f9f9f9',
        padding: 10,
        flex: 1,
        borderRadius: 8,
    },
    exchangeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#092635', //'#0984e3'
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    exchangeButtonText: {
        color: 'white',
        fontSize: 25,
    },
    button: {
        backgroundColor: '#092635', //'#0984e3' '#122053'
        borderRadius: 8,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    textInputContainer: {
        color: 'black',
        borderBottomColor: 'black',
        //borderBottomWidth: 0,
    },
    translationTextContainer: {
        color: 'black',
        //borderBottomColor: 'black',
        borderBottomWidth: 0,
    }
});