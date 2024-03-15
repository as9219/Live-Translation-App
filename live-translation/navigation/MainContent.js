import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// importing the screens
import HomeScreen from './screens/HomeScreen';
import TypingScreen from './screens/Test';
import TranslateScreen from './screens/TranslateScreen';
import HistoryScreen from './screens/History';

//setting the screen names 
const homeName = "Home";
const typingName = "Typing";
const translateName = "Live";
const historyName = "History";

const Tab = createBottomTabNavigator();

function MainContent() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={{
                tabBarActiveTintColor: 'cornflowerblue',
                tabBarInactiveTintColor: 'lightgray',
                labelStyle: { paddingBottom: 5, fontSize: 10},
                tabBarStyle: {
                    padding: 10, 
                    height: 90, 
                    backgroundColor: '#122053',
                    borderTopWidth: 0
                },
            }}>
    
            <Tab.Screen 
              name={homeName} 
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                ),
                tabBarLabel: homeName
              }}/>
            
            <Tab.Screen 
              name={typingName} 
              component={TypingScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'} size={size} color={color} />
                ),
                tabBarLabel: typingName
              }}/>
            
            <Tab.Screen 
              name={translateName} 
              component={TranslateScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'language' : 'language-outline'} size={size} color={color} />
                ),
                tabBarLabel: translateName
              }}/>
            
            <Tab.Screen 
              name={historyName} 
              component={HistoryScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                ),
                tabBarLabel: historyName
              }}/>
    
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default MainContent;