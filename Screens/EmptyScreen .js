// import React,{useState} from 'react'
// import { View, Text ,TextInput,Image,StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler';

// import {launchImageLibrary} from 'react-native-image-picker';

// import auth, { firebase,database } from "@react-native-firebase/auth";
// import storage from '@react-native-firebase/storage'

// import * as yup from 'yup';
// import { Formik } from 'formik';



// export default function EmptyScreens ({navigation}) {

//     const [downloadurl, setDownloadurl] = useState("https://en.m.wikipedia.org/wiki/File:Sample_User_Icon.png")


//     //open library and upload pic to firebase
//     const pickImageAndUpload = ()=>{
//         launchImageLibrary({quality:0.5},(fileobj)=>{
//         //    console.log(fileobj.assets[0].uri)
//          const uploadTask =  storage().ref().child(`/profilePictures/${Date.now()}`).putFile(fileobj.assets[0].uri)
//                 uploadTask.on('state_changed', 
//                  (snapshot) => {
  
//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     if(progress==100) alert('image uploaded')
                    
//                 }, 
//                 (error) => {
//                     alert("error uploading image",error)
//                 }, 
//                 //For fetching uploaded photo url
//                 () => {
//                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                         setDownloadurl(downloadURL)
//                     });
//                 }
//                 );
//         })
//     }

//     //Form validation YUP Schema
//     const loginValidationSchema = yup.object().shape({
//       name: yup.string().required("Name must be required"),
//       phone: yup.number().required("Phone Number must be required")
//       // .max(10,({max})=>"Phone number is not 10 digits with +91"),
//       ,email: yup.string().email("Enter a valid E-mail address").required("Enter a valid E-mail address"),
//       password: yup.string().min(8,({min})=>"Password must be at least 8 characters long").required("Password must be required")
//                 .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//                 "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      
//     }); 

//     //Create user in rnFirebase
//     const createUser=(values)=>{ 
      
//       const newReference = firebase.database().ref('/Users').push();
      
//       //Pass all input field as an object to .set() for creating user
//       const ids = newReference.key;
//       const userData = {
//         name: values.name,
//         phone: values.phone,
//         email: values.email,
//         password: values.password, 
//         id: ids,
//         image: downloadurl
//       }
//       //Creating refernce in rnFirebase
//       newReference.set(userData)
//       .then(() => console.log('Data updated.'))
//    // .then(()=> navigation.navigate('HomeScreen'))
//     }
    
//     return (
//       <Formik
//       initialValues={{ email: '',phone:'',phone:'',password:''}}
//       validateOnMount={true}
//       onSubmit={
//         values => {createUser(values)} 
//        //  console.log(values.email)
//       }
//       validationSchema={loginValidationSchema}
//     >
//      {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
//       <ScrollView style={styles.main}>
//       <View>
//               <Image
//               style={{height:170,width:170,borderWidth:2,borderColor:"dodgerblue",borderRadius:85,marginHorizontal:120,marginVertical:15}}
//               source={{uri:downloadurl}}/>

//             <View style={styles.box2}>
               
               
//                 <TouchableOpacity style={styles.tco}
                
                
//                 onPress={()=>pickImageAndUpload()}
//                 >
//                   <Image 
//              style={styles.cty}
//              source={require('../assets/pluss.png')}/>
//                   </TouchableOpacity>
               

//             </View>
//             </View>
          
//          <View>

//             <Text style={styles.Texts}>Enter Name :</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Yash Dubey"
//               autoCapitalize='none'
//               // value={name}
//               // onChangeText={text => setName(text)}
//               onChangeText={handleChange('name')}
//               onBlur={handleBlur('name')}
//               value={values.name}
//             />
//             {(errors.name && touched.name) && 
//               <Text style={styles.ErrorText}>{errors.name}</Text>
//             }


//             <Text  style={styles.Texts}>Enter Mobile :</Text>
//             <TextInput
//               style={styles.input}
//               maxLength={13}
//               placeholder="9918745589"
//               keyboardType="phone-pad"
//               // value={phone}
//               // onChangeText={number => setPhone(number)}
//               onChangeText={handleChange('phone')}
//               onBlur={handleBlur('phone')}
//               value={values.phone}
//             />
//             {(errors.phone && touched.phone) && 
//               <Text style={styles.ErrorText}>{errors.phone}</Text>
//             }



//             <Text  style={styles.Texts}>Enter E-mail :</Text>
//             <TextInput
//               style={styles.input}
//               autoCapitalize='none'
//               placeholder="YashDubey.Official@gemail.com"
//               keyboardType="email-address"
//               // value={email}
//               // onChangeText={text => setEmail(text)}
//               onChangeText={handleChange('email')}
//               onBlur={handleBlur('email')}
//               value={values.email}
//             />
//             {(errors.email && touched.email) && 
//               <Text style={styles.ErrorText}>{errors.email}</Text>
//             }


//             <Text  style={styles.Texts}>Enter Password :</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Yash@123#"
//               keyboardType="default"
//               secureTextEntry
//               // onChangeText={text => setPassword(text)}
//               // value={password}
//               onChangeText={handleChange('password')}
//               onBlur={handleBlur('password')}
//               value={values.password}
//             />
//             {(errors.password && touched.password) && 
//               <Text style={styles.ErrorText}>{errors.password}</Text>
//             }

//             <TouchableWithoutFeedback  onPress={handleSubmit}>
          
//               <View style={styles.button}>
//                 <Text style={{color:'white'}}>Create User</Text>
//               </View>

//             </TouchableWithoutFeedback>
//          </View>
       
//          </ScrollView>
//          )}

// </Formik>
    
//     )
// }


// const styles = StyleSheet.create({
//     text:{
//         fontSize:22,
//         color:"dodgerblue",
//         margin:20,
       
//     },
  
//     box2:{
//         paddingHorizontal:40,
//         justifyContent:"space-evenly",
        
//     },
//     input: {
//       height: 40,
//       width:350,
//       margin: 12,
//       borderWidth: 1,
//       borderRadius:50,padding:11
  
//     },
//     Texts:{
//         marginTop:10,
//       marginLeft:20,
//       color:'#000'
//     },
//     button: {
//       justifyContent:'center',
//       alignItems: "center",
//       backgroundColor: "#64beff",
//       padding: 10,
//       width:150,
//       borderRadius:50,
//       marginTop:40,
//       marginLeft:115,
  
//     },
//     ErrorText:{
//       marginLeft:20,
//       marginTop:-10,
//       color:'red'
//     },
 
//   mod:{
//     color:'dodgerblue',
//     margin:20,
//     flexDirection:'row',
//     justifyContent:'space-around'
   

//   },
//   tco:{
//     flex:1,
//     color:'dodgerblue'
//   },
//   cty:{
//     position:'absolute',
//     justifyContent:'center',
//     alignItems: "center",
//     padding: 1,
//     marginLeft:140,
//     // marginTop:30,
//     bottom:15,
//     left:60,
//     height:35,
//     width:35,
//     backgroundColor:'#fff',
//     borderRadius:20,
//     borderColor:"dodgerblue",
//     borderWidth:2
    
//   },
//   main:{
//     marginBottom:100
//   }
//  });

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [uploadTask, setUploadTask] = useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
  const [downloadURL, setDownloadURL] = useState();
  const [paused, setPaused] = useState(false);

  const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onMediaSelect);

  const onTakeVideo = () => launchCamera({ mediaType: 'video' }, onMediaSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({ mediaType: 'image' }, onMediaSelect);

  const onSelectVideoPress = () =>
    launchImageLibrary({ mediaType: 'video',storageOptions:{
      skipBackup:true,
      path:'images'
    } }, onMediaSelect);

  const togglePause = () => {
    if (paused) uploadTask.resume();
    else uploadTask.pause();
    setPaused((paused) => !paused);
  };

  const onMediaSelect = async (media) => {
    if (!media.didCancel) {
      console.log(media)
      // setUploading(true);
      // const reference = storage().ref(media.assets[0].fileName);
      // const task = reference.putFile(media.assets[0].uri);
      // setUploadTask(task);
      // task.on('state_changed', (taskSnapshot) => {
        // console.log(taskSnapshot)
        // setUploadTaskSnapshot(taskSnapshot);
      // });
      // task.then(async () => {
      //   const downloadURL = await reference.getDownloadURL();
      //   setDownloadURL(downloadURL);
      //   setUploading(false);
      //   setUploadTaskSnapshot({});
      // });
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Firebase Storage</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onTakeVideo}>
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectVideoPress}>
          <Text style={styles.buttonText}>Pick a Video</Text>
        </TouchableOpacity>
      </View>
      {uploading && (
        <View style={styles.uploading}>
          {!paused && (
            <ActivityIndicator size={60} color="#47477b"></ActivityIndicator>
          )}
          <Text style={styles.statusText}>
            {!paused ? 'Uploading' : 'Paused'}
          </Text>
          <Text style={styles.statusText}>
            {`${(
              (uploadTaskSnapshot.bytesTransferred /
                uploadTaskSnapshot.totalBytes) *
              100
            ).toFixed(2)}% / 100%`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={togglePause}>
            <Text style={styles.buttonText}>{paused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>
        </View>
      )}
      {downloadURL && (
        <TouchableOpacity
          style={[styles.button, styles.mediaButton]}
          onPress={() => Linking.openURL(downloadURL)}>
          <Text style={styles.buttonText}>View Media</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#226557',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  mediaButton: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    width: 300,
  },
  uploading: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 20,
    fontSize: 20,
  },
});