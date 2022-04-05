import { View, Text, Button,TextInput } from 'react-native'
import React ,{useEffect,useState} from 'react'

import database from '@react-native-firebase/database';
import firebase  from '@react-native-firebase/auth'

 export default function OTPScreen ({navigation}) {
  
  // console.log("your props :", route.params.confirmation)
  const [code, setCode] = useState('123456');


  const confirmCode = async() => {
    if (code) {
      try {
        await props.confirm.confirm(code);
        navigation.navigate('BottomNavigation');
      } catch (error) {
        alert('Invalid OTP', error);
      }
    } else {
      alert('Please Enter OTP');
    }
    }
    
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TextInput style={{color:'black',borderWidth:1,width:350,marginBottom:20}} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={confirmCode} />
     
    </View>
  );

}

