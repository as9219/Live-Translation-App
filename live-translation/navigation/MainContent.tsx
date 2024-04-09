import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// importing the screens
import HomeScreen from './screens/HomeScreen.tsx';
import TypingScreen from './screens/TypingV2.tsx';
import TranslateScreen from './screens/TranslateScreen.tsx';
import HistoryScreen from './screens/History.tsx';

//types for the screens
type RootTabParameterList = {
    Home: undefined;
    TypingV2: undefined;
    TranslateScreen: undefined;
    History: undefined;
}

//setting the screen route names 
const homeName = "Home";
const typingName = "Typing";
const translateName = "Live";
const historyName = "History";

const Tab = createBottomTabNavigator<RootTabParameterList>();

function MainContent() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={{
                tabBarActiveTintColor: '#635985',
                tabBarInactiveTintColor: 'lightgray',
                tabBarStyle: {
                    paddingBottom: 10, 
                    height: 90, 
                    backgroundColor: '#18122B',
                    borderTopWidth: 0,
                },
            }}>
    
            <Tab.Screen 
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                ),
                tabBarLabel: homeName
              }}/>
            
            <Tab.Screen 
              name="TypingV2" 
              component={TypingScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Icon 
                  name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'}
                  size={size} 
                  color={color} />
                ),
                tabBarLabel: typingName
              }}/>
            
            <Tab.Screen 
              name="TranslateScreen"
              component={TranslateScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Icon name={focused ? 'language' : 'language-outline'} size={size} color={color} />
                ),
                tabBarLabel: translateName
              }}/>
            
            <Tab.Screen 
              name="History" 
              component={HistoryScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Icon name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                ),
                tabBarLabel: historyName
              }}/>
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default MainContent;