import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { mainStyle } from '../styles/MainStyle.js'; 

export default function HomeScreen({ navigation }) {
    return (
        <View style={mainStyle.view}>
            <StatusBar barStyle="light-content" />
            {/* <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={mainStyle.text}>Home Screen</Text> */}
            <Text>This is some sample text</Text>
        </View>
    );
}

// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import {RootTabParameterList} from '../MainContent.js'; // Adjust the import path as necessary

// type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParameterList, 'Home'>;

// export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
//     <View style={mainStyle.view}>
//         <StatusBar barStyle="light-content" />
//             {/* <Text
//                 onPress={() => alert('This is the "Home" screen.')}
//                 style={mainStyle.text}>Home Screen</Text> */}
//             <Text>This is some sample text</Text>
//     </View>
// }