import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// importing the screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/Typing';
import SettingsScreen from './screens/Audio';
import HistoryScreen from './screens/History';
import { SafeAreaView } from 'react-native';

//setting the screen names 
const homeName = "Home";
const detailsName = "Typing";
const settingsName = "Audio";
const historyName = "History";

const Tab = createBottomTabNavigator();


function MainContent() {
    return (
      
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={{
                tabBarActiveTintColor: "ghostwhite",
                tabBarInactiveTintColor: 'lightgray',
                labelStyle: { paddingBottom: 10, fontSize: 10},
                tabBarStyle: {
                    padding: 10, 
                    height: 80, 
                    backgroundColor: 'navy',
                },
            }}>
    
            <Tab.Screen 
              name={homeName} 
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                )
              }}/>
            
            <Tab.Screen 
              name={detailsName} 
              component={DetailsScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'} size={size} color={color} />
                )
              }}/>
            
            <Tab.Screen 
              name={settingsName} 
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'volume-high' : 'volume-high-outline'} size={size} color={color} />
                )
              }}/>
            
            <Tab.Screen 
              name={historyName} 
              component={HistoryScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
                )
              }}/>
    
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default MainContent;