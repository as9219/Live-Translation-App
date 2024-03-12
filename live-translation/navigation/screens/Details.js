import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function DetailsScreen({ navigation }) {
    return (
        <View style={DetailsStyle.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={DetailsStyle.text}>Details Screen</Text>
        </View>
    );
}

const DetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});