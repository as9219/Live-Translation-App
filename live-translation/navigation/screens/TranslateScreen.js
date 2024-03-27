import { View, Text, StyleSheet, TouchableOpacity,TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';


export default function TranslateScreen({ navigation }) {
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
                        <Text style = {styles.text}>This is some sample text for the main chat container</Text>
                    </View>
                    <View style={styles.parentInputContainer}>
                        <View style={styles.textInputContainer}>
                            <Input
                                placeholder="Type Here"
                                placeholderTextColor={'black'}
                                inputContainerStyle={styles.textBox}
                                multiline={true}
                                // Allow multiline input for translation text
                                numberOfLines={1}
                            />
                            <TouchableOpacity style={styles.sendButton}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View> 
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
        backgroundColor: '#1B4242', //'#152f8d'
    },

    //implemented for KeyboardAvoidingView
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    chatContainer: {
        width: '100%',
        height: '70%',
        padding: 10,
        backgroundColor: '#5C8360',
    },
    parentInputContainer: {
        
        justifyContent: 'space-between',
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        //paddingLeft: 30,
        backgroundColor: '#5C8374',
        shadowColor: '#000',
        //shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    textBox: {
        flex: 1,
        borderBottomWidth: 0,
        marginLeft: 80,
        paddingTop: 10,
        textAlign: 'left',
        maxHeight: 50,
    },
    sendButton: {
        flex: 0,
        backgroundColor: '#4BAF51',
        borderRadius: 25,
        padding: 10,
        marginRight: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        color: 'white',
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