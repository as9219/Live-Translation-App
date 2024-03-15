import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { mainStyle } from '../styles/MainStyle.js'; 
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

export default function TypingScreen({ navigation }) {
    const [name, setText] = React.useState("");

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={typeScreenStyle.view}>
                <TextInput
                    style={typeScreenStyle.input}
                    onChangeText={(value) => setText(value)}
                    keyboardAppearance='dark'
                    placeholder='English Here'
                    multiline={true}
                    activeUnderlineColor="yellow"
                    underlineColor="red"
                    cursora Color= 'ghostwhite'
                />
                <Text>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const typeScreenStyle = StyleSheet.create({
  input: {
    height: 100,
    width: "95%",
    margin: 10,
    padding: 10,
    borderWidth: 2,
    marginTop: '20%',
    borderColor: 'ghostwhite',
    borderRadius: 10,
    padding: 10,
    color: 'ghostwhite',
    backgroundColor: 'navy'
  },
  
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#152f8d'
  }
});
