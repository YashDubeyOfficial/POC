'use strict';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { useValidation } from 'react-native-form-validator';

const FormTest = () => {
  const [name, setName] = useState('My name');
  const [email, setEmail] = useState('tibtib@gmail.com');
  const [number, setNumber] = useState('56');
  const [date, setDate] = useState('2017-03-01');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { name, email, number, date, newPassword, confirmPassword },
    });

  const _onPressButton = () => {
    validate({
      name: { minlength: 3, maxlength: 7, required: true },
      email: { email: true },
      number: { numbers: true },
      date: { date: 'YYYY-MM-DD' },
      confirmPassword: { equalPassword: newPassword },
    });
  };

  return (
    <View>
      <TextInput onChangeText={setName} value={name} />
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setNumber} value={number} />
      <TextInput onChangeText={setDate} value={date} />
      {isFieldInError('date') &&
        getErrorsInField('date').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}

      <TextInput
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry={true}
      />
      <TextInput
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
      />
      {isFieldInError('confirmPassword') &&
        getErrorsInField('confirmPassword').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}

      <TouchableHighlight onPress={_onPressButton}>
        <Text>Submit</Text>
      </TouchableHighlight>

      <Text>{getErrorMessages()}</Text>
    </View>
  );
};

export default FormTest;



const handleValidEmail = val => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
  //for zero length
  if (val.length === 0) {
    setEmailValidError('email address must be enter');
  } 
  //for invalid type
  else if (reg.test(val) === false) {
    setEmailValidError('enter valid email address');
  } else if (reg.test(val) === true) {
    setEmailValidError('');
  }
  };


  const handleValidName = () =>{
    if (val.length <= 3) {
      setNameValidError('Invalid Name enter at least 3 characheters');
    } else{
      setNameValidError('')
    }
  }


  const handleValidPhone = () =>{
    if (val.length <= 3) {
      setPhoneValidError('Invalid Name enter at least 3 characheters');
    } else{
      setPhoneValidError('')
    }
  }
  
  const handleValidPassword = () =>{
    if (val.length <= 3) {
      setPhoneValidError('Invalid Name enter at least 3 characheters');
    } else{
      setPhoneValidError('')
    }
  }
  

  //           file:///data/user/0/com.projectpoc/cache/rn_image_picker_lib_temp_007bf1f5-fda4-48d0-a20a-4f17272e330b.mp4

  //          content://com.google.android.apps.photos.contentprovider/-1/2/content%3A%2F%2Fmedia%2Fexternal%2Fvideo%2Fmedia%2F65/ORIGINAL/NONE/video%2Fmp4/1324232226