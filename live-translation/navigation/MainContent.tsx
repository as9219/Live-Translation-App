import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// importing the screens
import HomeScreen from './screens/HomeScreen.tsx';
import Settings from './screens/Settings.tsx';

//types for the screens
export type RootTabParameterList = {
    Home: undefined;
    Settings: undefined;
}

//setting the screen route names 
const homeName = "Home";
const settingsName = "Settings";

const Tab = createBottomTabNavigator<RootTabParameterList>();

function MainContent() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={{
                tabBarActiveTintColor: '#DFD0B8',
                tabBarInactiveTintColor: 'lightgray',
                tabBarStyle: {
                    paddingBottom: 10, 
                    height: 90, 
                    backgroundColor: '#948979',
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
              name="Settings"
              component={Settings}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Icon name={focused ? 'language' : 'language-outline'} size={size} color={color} />
                ),
                tabBarLabel: settingsName
              }}/>
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default MainContent;