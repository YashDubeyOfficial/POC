// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Text, Image,Button,style,TouchableOpacity,SectionList} from 'react-native';
// import {FlatList, ScrollView} from 'react-native-gesture-handler';
// import database, {firebase} from '@react-native-firebase/database';
// import ActionButton from "react-native-action-button";
// import Icon from "react-native-vector-icons/Ionicons";
// import { LogBox } from 'react-native';
// import CreateUserScreen from './CreateUserScreen'

// export default function App({navigation,props}) {
//   useEffect(() => {
//     LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
// }, [])

//   const [itemArray, setItemArray] = useState([])

//   const LogOut = () =>{
  
//   firebase.auth().signOut()
//   console.log('User signed out!');
//   navigation.replace('LoginScreen');
  
//   }
//   const readUserData = async (navigation) => {
//    database().ref('/User/')
//    .on('value', snapshot => {
//     setItemArray(Object.values(snapshot.val()))
//     console.log(setItemArray)
//   });
//   };
  

//   const EditUser = (item) => {
//     // alert("error")
//     navigation.navigate('EditUserScreen',
//       {
//         name: item.name,
//         email: item.email,
//         phone:item.phone,
//         password:item.password,
//         id: item.id, 
//         image:item.image
//       }
//     )
//   }


//   return (
  
      
//     <View style={{marginBottom:530,paddingBottom:1}} >

//         <FlatList
//             data={itemArray}
//             renderItem={({item})=>
//             <View style={styles.Card}>
//                 <Image
//                     style={styles.CardImg}
//                     source={{uri:item.image}}/>
//                 <View style={styles.CardItem}>
//                     <Text style={{color:'#000',fontSize:15,}}> Name :   {item.name}</Text>
//                     <Text style={{color:'#000',fontSize:15,}}> E-mail :  {item.email}</Text>
//                     <Text style={{color:'#000',fontSize:15,}}> Phone-Number :  {item.phone}</Text>
//                     <TouchableOpacity 
//                       onPress={()=>EditUser(item)} 
//                       style={{backgroundColor:'#226557',width:70,marginTop:10,borderRadius:5}}>
//                       <Text style={{padding:7}}>Edit user</Text>
//                     </TouchableOpacity>
//                 </View>
//               </View>}       
//           />


          
//    <View style={{ marginTop:400,backgroundColor: 'dodgerblue'}}>

// <ActionButton buttonColor="#226557" >
//   <ActionButton.Item buttonColor='#fff' title="ReadUser"  onPress={readUserData}>
    
//   <Image source={require('../assets/Img/read.png')} style={{height:5,width:4,padding:11}}/>
//   </ActionButton.Item>
//   <ActionButton.Item buttonColor='#fff' title="Create" onPress={() => navigation.navigate('CreateUserScreen')}>
//   <Image source={require('../assets/Img/create.png')} style={{height:5,width:4,padding:11}}/>
//   </ActionButton.Item>
//   <ActionButton.Item buttonColor='#fff' title="LogOut" onPress={LogOut}>
//   <Image source={require('../assets/Img/Logoutt.png')} style={{height:5,width:4,padding:10}}/>
//   </ActionButton.Item>
// </ActionButton>
// </View>
//     </View>


//   );

// }

// const styles = StyleSheet.create({
//   title: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'green',
//     marginBottom: 20,
//     paddingLeft: 15,
//   },
//   tapLogin:{

//     backgroundColor: '#226557',
//     width:100,
//     margin:100,
//     color:'#fff',
//     lineHeight:40,
//     fontSize:20,
//     textAlign:'center'
//   },
//   actionButtonIcon: {
//     fontSize: 20,
//     height: 22,
//     color: "white",
//     padding:200
//   },
//   lgt:{
//     backgroundColor:'#226557',
//     justifyContent:'center',
//     alignItems: 'center',
//     width:100,
//     height:40,
//     borderRadius:25,
//     // bottom:0,
//     // left:5,`````
//     fontSize:5,
    
//   },
//   Card:{
//     color:'green',
//     marginTop:10,
//     marginStart:5,
//     marginEnd:5,
//     padding:5,
//     borderWidth:2,
//     borderColor:'#226557',
//     flexDirection:"row",
//     alignItems:'center'
//   },
//   CardImg:{
//     height:100,
//     width:100,
//     borderWidth:2,
//     borderColor:"dodgerblue",
//     borderRadius:75
//   },
//   CardItem:{
//     padding:5
//   },
//   itemButton: {
//     left:0, right:0,
//     top:0,
//     bottom:0,
//     position:'absolute'

    
    
//   },
// });

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image,Button,style,TouchableOpacity,TextInput} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import database, {firebase} from '@react-native-firebase/database';
import { back } from 'react-native/Libraries/Animated/Easing';
import {Picker} from '@react-native-picker/picker';
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { LogBox } from 'react-native';
import CreateUserScreen from './CreateUserScreen'
import {requestUserPermission} from '../util/NotificationServices'


export default function App({navigation,props}) {

  const [itemArray, setItemArray] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState();
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])

  useEffect(() => {
    readUserData()
  
    return () => {
      
    }
  }, [])

  useEffect(() =>{
    requestUserPermission()
    readUserData()
  }, []);

  //LogOut from ReactNativeFirebase phone Authentication
  const LogOut = () =>{    
      firebase.auth().signOut()
      console.log('User signed out!');
      navigation.replace('LoginScreen');
  }

  //ReadUser data from rnFirebase realtime DB
  const readUserData = async () => {
   database().ref('/User/')
   .on('value', snapshot => {
    setItemArray(Object.values(snapshot.val()))
    setFilteredData(Object.values(snapshot.val()))
    // console.log(setItemArray)
  });
  };

  const EditUser = (item) => {
    // alert("error")
    navigation.navigate('EditUserScreen',
      {
        name: item.name,
        email: item.email,
        phone:item.phone,
        password:item.password,
        id: item.id, 
        image:item.image
      }
    )
  }

  //filter data for serach input
  const SearchBtn = ()=>{
    // if(search != ""){
    //   const newData = itemArray.filter((item)=>{
    //     const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
    //     const textData = search.toLowerCase();
    //   })
    //   setFilteredData(newData)
    //   console.log(newData)
    // }
    // alert(search)
    filteredData.filter((val) =>{
      if (search == ''){
        setFilteredData(val)
        // setItemArray(val)
        console.log(setFilteredData)
       }else if (
         val.name.toLowerCase().includes(search.toLowerCase()) || 
         val.email.toLowerCase().includes(search.toLowerCase()) || 
         val.phone.toString().toLowerCase().includes(search.toString().toLowerCase()) 
       ){
          setFilteredData(val)
          // setItemArray(val)
          console.log(setFilteredData)
       }
    })
  }
                      

    
  
  
  return (
  
      
    <View style={{marginBottom:125,borderWidth:3,borderColor:"#226557"}} >
    
    <View style={{flexDirection:'row'}}>
      
        <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  placeholder="Search here"
                  keyboardType="email-address"
                  onChangeText={(text)=>{setSearch(text)}}
                  value={search}
                  // onBlur={handleBlur('email')}
        /> 
        <TouchableOpacity style={{backgroundColor:"#226557",marginTop:10,marginBottom:10,borderRadius:10,justifyContent:'center', height:50}}
              onPress={SearchBtn}>
                <Text style={{color:'#fff'}}>Search</Text>
              </TouchableOpacity>
         <Picker
              mode='dropdown'
              style={styles.picker}
              selectedValue={sortBy}
              onValueChange={(itemValue, itemIndex) =>
              setSortBy(itemValue)
              }>
                <Picker.Item label="A-Z" value="A-Z"/>
                <Picker.Item label="Z-A" value="Z-A" />
                <Picker.Item label="Email" value="Email" />
              </Picker>
    </View>
            
        <FlatList
            data={filteredData}
            renderItem={({item})=>

            <View style={styles.Card}>
                <Image
                    style={styles.CardImg}
                    source={{uri:item.image}}/>
                <View style={styles.CardItem}>
                    <Text style={{color:'#000',fontSize:15,}}> Name :   {item.name}</Text>
                    <Text style={{color:'#000',fontSize:15,}}> E-mail :  {item.email}</Text>
                    <Text style={{color:'#000',fontSize:15,}}> Phone-Number :  {item.phone}</Text>
                    <TouchableOpacity 
                      onPress={()=>EditUser(item)} 
                      style={{backgroundColor:'#226557',width:70,marginTop:10,borderRadius:5}}>
                      <Text style={{padding:7}}>Edit user</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            }
            
          />
        {/* {/ <View style={{ marginTop:0,backgroundColor: 'dodgerblue'}}> /} */}

          <ActionButton buttonColor="#226557" size={50} spacing={6} bgColor='white'>
            <ActionButton.Item buttonColor='#fff' title="ReadUser"  onPress={readUserData}>
              
            <Image source={require('../assets/Img/read.png')} style={{height:5,width:4,padding:11}}/>
          </ActionButton.Item>
            <ActionButton.Item buttonColor='#fff' title="Create" onPress={() => navigation.navigate('CreateUserScreen')}>
            <Image source={require('../assets/Img/create.png')} style={{height:5,width:4,padding:11}}/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#fff' title="LogOut" onPress={LogOut}>
            <Image source={require('../assets/Img/Logoutt.png')} style={{height:5,width:4,padding:10}}/>
            </ActionButton.Item>
          </ActionButton>
        {/* {/ </View> /} */}
    </View>


  );

}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green',
    marginBottom: 20,
    paddingLeft: 15,
  },
  input: {
    height: 50,
    width:250,
    margin: 10,
    borderWidth: 1,
    borderRadius:5,
    padding:11

  },
  picker:{
    // backgroundColor:'#d3d3d3',
    borderColor:"black",
    borderWidth:3,
    width:100,
    height:50,
    borderRadius:25,
    marginTop:10,

  },
  tapLogin:{
    backgroundColor: '#64beff',
    width:100,
    margin:100,
    color:'#fff',
    lineHeight:40,
    fontSize:20,
    textAlign:'center'
  },
  lgt:{
    backgroundColor:'#64beff',
    justifyContent:'center',
    alignItems: 'center',
    width:100,
    height:40,
    borderRadius:25,
    // bottom:0,
    // left:5,
    fontSize:5,
    
  },
  Card:{
    color:'black',
    marginTop:10,
    marginStart:15,
    marginEnd:15,
    padding:5,
    borderWidth:2,
    borderColor:'#64beff',
    flexDirection:"row",
    alignItems:'center',
    borderRadius:10,
    shadowColor:'green',
    shadowOpacity:1,
    shadowRadius:20,
    shadowOffset:{
      width:100,
      height:100
    },
    // backgroundColor:'#000'
  },
  CardImg:{
    height:100,
    width:100,
    borderWidth:2,
    borderColor:"dodgerblue",
    borderRadius:75
  },
  CardItem:{
    padding:5,
    color:"black"
  }
});





// import React, {useState, useEffect} from "react"
// import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';

// export default function ABCDEE(){


//   const [arrayholder,setArrayholder] =useState([])
//   const[data, setData] = useState([])
//   const[text, setText] = useState('')
//   const [loading , setLoading] = useState(true)

//   const fetchAPI = ()=> {
//     return fetch('https://api.covid19api.com/countries')
//     .then((response) => response.json())
//     .then((responseJson) => {
//         setData(responseJson)
//         setLoading(false)
//         setArrayholder(responseJson)
//     }

//     )
//     .catch((error) => {
//         console.error(error);
//       });
// }

//   useEffect(() => {
//     fetchAPI();
//   },[])


//   const searchData= (text)=>  {
//     const newData = arrayholder.filter(item => {
//       const itemData = item.Country.toUpperCase();
//       const textData = text.toUpperCase();
//       return itemData.indexOf(textData) > -1
//     });

//       setData(newData)
//       setText(text)
//     }

//    const itemSeparator = () => {
//       return (
//         <View
//           style={{
//             height: .5,
//             width: "100%",
//             backgroundColor: "#000",
//           }}
//         />
//       );
//     }

//       return (
//           <View style={{flex:1}} >
//     {loading === false ?  
//         <View style={styles.MainContainer}>

//         <TextInput 
//          style={styles.textInput}
//          onChangeText={(text) => searchData(text)}
//          value={text}
//          underlineColorAndroid='transparent'
//          placeholder="Search Here" />

//         <FlatList
//           data={data}
//           keyExtractor={ (item, index) => index.toString() }
//           ItemSeparatorComponent={itemSeparator}
//           renderItem={( {item}  ) => <Text style={styles.row}
//            >{item.Country}</Text>}
//           style={{ marginTop: 10 }} />

//       </View>
//       : <Text>loading</Text>}

//       </View>
//     );
//   }

// const handleValidEmail = val => {
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
//   //for zero length
//   if (val.length === 0) {
//     setEmailValidError('email address must be enter');
//   } 
//   //for invalid type
//   else if (reg.test(val) === false) {
//     setEmailValidError('enter valid email address');
//   } else if (reg.test(val) === true) {
//     setEmailValidError('');
//   }
//   };


//   const handleValidName = () =>{
//     if (val.length <= 3) {
//       setNameValidError('Invalid Name enter at least 3 characheters');
//     } else{
//       setNameValidError('')
//     }
//   }


//   const handleValidPhone = () =>{
//     if (val.length <= 3) {
//       setPhoneValidError('Invalid Name enter at least 3 characheters');
//     } else{
//       setPhoneValidError('')
//     }
//   }
  
//   const handleValidPassword = () =>{
//     if (val.length <= 3) {
//       setPhoneValidError('Invalid Name enter at least 3 characheters');
//     } else{
//       setPhoneValidError('')
//     }
//   }
  

//   //           file:///data/user/0/com.projectpoc/cache/rn_image_picker_lib_temp_007bf1f5-fda4-48d0-a20a-4f17272e330b.mp4

//   //          content://com.google.android.apps.photos.contentprovider/-1/2/content%3A%2F%2Fmedia%2Fexternal%2Fvideo%2Fmedia%2F65/ORIGINAL/NONE/video%2Fmp4/1324232226