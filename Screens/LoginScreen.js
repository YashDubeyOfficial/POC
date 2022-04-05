import React, { useState } from 'react';
import { Button, TextInput,View } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function LoginScreen({navigation}) {

  const [phoneNumber, setPhoneNumber] = useState('+447444555666');
  
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  
  const [code, setCode] = useState('123456');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code)
      
    } catch (error) {
      console.log('Invalid code.',error);
    }
  }

  if (!confirm) {


    // const onChangeNumber = ()=>{
    //   setPhoneNumber()
    // }
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TextInput
       
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        style={{color:'#000',borderWidth:1,width:350,marginBottom:20}}
      />
     
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber(phoneNumber)}
        
      />

      </View>
    );
  }

   return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TextInput style={{color:'black',borderWidth:1,width:350,marginBottom:20}} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode().then(()=>{navigation.navigate('BottomNavigation')})} />
     
    </View>
  );

  
  
}





