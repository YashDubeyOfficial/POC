import React from 'react'

import HomeScreen from '../Screens/HomeScreen'
import CreateUserScreen from '../Screens/CreateUserScreen'
import EditUserScreen from '../Screens/EditUserScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const NewUserStackNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}
         /> 
        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
        <Stack.Screen name="EditUserScreen" component={EditUserScreen} />       
        {/* <Stack.Screen name='BottomNavigation' component={BottomNavigation}
          options={{
            headerShown:false,
          }}
        /> */}

    </Stack.Navigator>
  )
}

export default NewUserStackNavigation


// import { View, Text } from 'react-native'
// import React from 'react'

// const NewUserStackNavigation = () => {
//   return (
//     <View>
//       <Text>NewUserStackNavigation</Text>
//     </View>
//   )
// }

// export default NewUserStackNavigation