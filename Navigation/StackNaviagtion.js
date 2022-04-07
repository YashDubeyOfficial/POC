import { View, Text ,LogBox} from 'react-native'
import React,{useEffect, useState} from 'react'

import LoginScreen from '../Screens/LoginScreen'
import OTPScreen from '../Screens/OTPScreen'
import BottomNavigation from './BottomNavigation'
import SplashScreen from '../Screens/splash'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);
    // LogBox.ignoreLogs(['ActionButton: `componentWillReceiveProps']);
  }, []);



  return (
    <Stack.Navigator>
    {showSplashScreen ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : null}
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

