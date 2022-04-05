import { View, Text } from 'react-native'
import React from 'react'

import LoginScreen from '../Screens/LoginScreen'
import OTPScreen from '../Screens/OTPScreen'
import BottomNavigation from './BottomNavigation'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='BottomNavigation' component={BottomNavigation}
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        {/* <Stack.Screen name='HomeScreen' component={HomeScreen}/> */}
    </Stack.Navigator>
  )
}

export default StackNavigation