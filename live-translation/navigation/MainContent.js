import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

// importing the screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/Details';
import SettingsScreen from './screens/Settings';

//setting the screen names 
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();


function MainContent() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
    
                if (rn === homeName) {
                  iconName = focused ? 'home' : 'home-outline';
    
                } else if (rn === detailsName) {
                  iconName = focused ? 'list' : 'list-outline';
    
                } else if (rn === settingsName) {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
    
                // changes the icons of the tabs
                return <Ionicons name={iconName} size={size} color={color} />;



              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'grey',
              labelStyle: { paddingBottom: 10, fontSize: 10 },
              style: { padding: 10, height: 70}
            }}>
    
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={detailsName} component={DetailsScreen} />
            <Tab.Screen name={settingsName} component={SettingsScreen} />
    
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default MainContent;