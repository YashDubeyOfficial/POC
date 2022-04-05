import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen'
import CreateUserScreen from '../Screens/CreateUserScreen'
import EmptyScreen  from '../Screens/EmptyScreen '
import NewUserStackNavigation from './NewUserStackNavigation'
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (

    <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused
                ? 'users'
                : 'users';
              size = 20;
            // } else if (route.name === 'Empty') {
            //   iconName = focused 
            //   ? 'plus-circle' 
            //   : 'plus-circle';
            //   size = 20;
            }
            else if (route.name === 'CreateUserScreen') {
              iconName = focused 
              ? 'file-picture-o' 
              : 'users';
              size = 20;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#333',
          tabBarActiveBackgroundColor:'#64beff',//background color 3748f7
          tabBarInactiveBackgroundColor:'#d3d3d3',
          tabBarShowLabel:true,
          tabBarStyle:{
            position:'absolute',
            overflow:'hidden',
            borderRadius:50,
            bottom:10,
            marginHorizontal:16,
            
            
          }
        })
        
        }
   
      >
      <Tab.Screen name="Home" component={NewUserStackNavigation}
      options={{
            headerShown:false,
          }} />
      <Tab.Screen name="Empty " component={EmptyScreen} />
      {/* <Tab.Screen name="CreateUser" component={CreateUserScreen} /> */}
    </Tab.Navigator>
   
  )
}

export default BottomNavigation