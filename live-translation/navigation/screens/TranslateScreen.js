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
                                placeholderTextColor={'white'}
                                inputContainerStyle={styles.textBox}
                                multiline={true}
                                // Allow multiline input for translation text
                                numberOfLines={1}
                            />
                        </View> 
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendButtonText}>Send</Text>
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
        height: '70%',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#635985',
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
        //flex: 0,
        backgroundColor: '#DBE7C9',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
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