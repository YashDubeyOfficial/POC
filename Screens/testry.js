import React, {useState, useEffect} from "react"
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';

export default function ABCDEE(){


  const [arrayholder,setArrayholder] =useState([])
  const[data, setData] = useState([])
  const[text, setText] = useState('')
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch('https://api.covid19api.com/countries')
    .then((response) => response.json())
    .then((responseJson) => {
        setData(responseJson)
        setLoading(false)
        setArrayholder(responseJson)
    }

    )
    .catch((error) => {
        console.error(error);
      });
}

  useEffect(() => {
    fetchAPI();
  },[])


  const searchData= (text)=>  {
    const newData = arrayholder.filter(item => {
      const itemData = item.Country.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

      setData(newData)
      setText(text)
    }

   const itemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }

      return (
          <View style={{flex:1}} >
    {loading === false ?  
        <View style={styles.MainContainer}>

        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />

        <FlatList
          data={data}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={itemSeparator}
          renderItem={( {item}  ) => <Text style={styles.row}
           >{item.Country}</Text>}
          style={{ marginTop: 10 }} />

      </View>
      : <Text>loading</Text>}

      </View>
    );
  }

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