import { View,Image, Text, TextInput,SafeAreaView, StyleSheet,ScrollView,TouchableOpacity,TouchableWithoutFeedback,Alert,Button} from 'react-native'
import React ,{useState,useEffect} from 'react'
import firebase  from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'
import {launchImageLibrary} from 'react-native-image-picker';
import * as yup from 'yup';
import { Formik } from 'formik';


export default function EditUserScreen ({route, navigation}) {

  
    //open library and upload pic to firebase
    const pickImageAndUpload = ()=>{
      launchImageLibrary({quality:0.5},(fileobj)=>{
      //    console.log(fileobj.assets[0].uri)
      const uploadTask =  storage().ref().child(`/profilePictures/${Date.now()}`).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed', 
              (snapshot) => {

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(progress==100) alert('image uploaded')
                
            }, 
            (error) => {
                alert("error uploading image",error)
            }, 
            //For fetching uploaded photo url
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setDownloadurl(downloadURL)
                });
            }
            );
        })
    }

    //Form validation YUP Schema
    const loginValidationSchema = yup.object().shape({
      name: yup.string().min(3, 'must be at least 3 characters long').required("Name must be required"),
      phone: yup.string().required("Phone Number must be required")
      ,email: yup.string().email("Enter a valid E-mail address").required("Enter a valid E-mail address"),
      password: yup.string().min(8,"Password must be at least 8 characters long").required("Password must be required")
                .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      
    }); 

  //Update user info in rnFirebase
  const UpdateUser = (values) => {
    let refer = database().ref(`/Users/${id}`)
    
    refer.update({
      name: values.name,
      phone: values.phone,
      email: values.email,
      password: values.password,
      image: downloadurl
      
    })
    .then(() => console.log('Data updated.'));
    Alert.alert(
      "",
      "User Profile is updated",
      [
        
        { text: "OK", onPress: () => navigation.navigate('HomeScreen') }
      ]
    );

  }

  const [id, setID] = useState(route.params.id) //state for user ID
  const [downloadurl, setDownloadurl] = useState(route.params.image)  // state for rnfirebase storage link

  return ( 
    <Formik
      initialValues={{name:route.params.name, email:route.params.email, phone:route.params.phone, password:route.params.password}}
      // validateOnMount={true}
      onSubmit={
        values => 
        {UpdateUser(values)} 
        // console.log(values)
      }
      validationSchema={loginValidationSchema}
    >
     {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
    <ScrollView>
    <View style={{marginTop:40 ,marginBottom:100,flex:1,alignItems:'center',justifyContent:'center'}}>
      <SafeAreaView >
      <Image
              style={{height:170,width:170,borderWidth:2,borderColor:"dodgerblue",borderRadius:85,marginHorizontal:90,marginBottom:20}}
              source={{uri:downloadurl}}/>

              <TouchableOpacity style={styles.tco} onPress={()=>pickImageAndUpload()}>
                    <Image 
                      style={styles.cty}
                      source={require('../assets/pluss.png')}/>
                </TouchableOpacity>

      <Text style={styles.Texts}>Enter Name :</Text>
            <TextInput
              style={styles.input}
              placeholder="Yash Dubey"
              autoCapitalize='none'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {(errors.name && touched.name) && 
              <Text style={styles.ErrorText}>{errors.name}</Text>
            }


            <Text  style={styles.Texts}>Enter Mobile :</Text>
            <TextInput
              style={styles.input}
              maxLength={13}
              placeholder="9918745589"
              keyboardType="phone-pad"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {(errors.phone && touched.phone) && 
              <Text style={styles.ErrorText}>{errors.phone}</Text>
            }



            <Text  style={styles.Texts}>Enter E-mail :</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              placeholder="YashDubey.Official@gemail.com"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {(errors.email && touched.email) && 
              <Text style={styles.ErrorText}>{errors.email}</Text>
            }


            <Text  style={styles.Texts}>Enter Password :</Text>
            <TextInput
              style={styles.input}
              placeholder="Yash@123#"
              keyboardType="default"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {(errors.password && touched.password) && 
              <Text style={styles.ErrorText}>{errors.password}</Text>
            }
          <TouchableWithoutFeedback  
          onPress={handleSubmit}
          >     
            <View style={styles.button}>
              <Text style={{color:'white'}}>Edit User Details</Text>
            </View>
          </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
    </ScrollView>
 )}

 </Formik>
  )
}


const styles = StyleSheet.create({
  input: {
      height: 40,
    width:350,
    margin: 12,
    borderWidth: 1,
    borderRadius:50,padding:11

  },
  Texts:{
      marginTop:10,
    marginLeft:20,
    color:'#000'
  },
  button: {
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#64beff",
    padding: 10,
    width:150,
    borderRadius:50,
    marginTop:40,
    marginLeft:115,

  },
  text:{
        fontSize:22,
        color:"dodgerblue",
        margin:20,
       
    },
  
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        
    },
    input: {
      height: 40,
      width:350,
      margin: 12,
      borderWidth: 1,
      borderRadius:50,padding:11
  
    },
    Texts:{
        marginTop:10,
      marginLeft:20,
      color:'#000'
    },
    button: {
      justifyContent:'center',
      alignItems: "center",
      backgroundColor: "#64beff",
      padding: 10,
      width:150,
      borderRadius:50,
      marginTop:40,
      marginLeft:115,
  
    },
    ErrorText:{
      marginLeft:20,
      marginTop:-10,
      color:'red'
    },
 
  mod:{
    color:'dodgerblue',
    margin:20,
    flexDirection:'row',
    justifyContent:'space-around'
   

  },
  tco:{
    flex:1,
    color:'dodgerblue'
  },
  cty:{
    position:'absolute',
    justifyContent:'center',
    alignItems: "center",
    padding: 1,
    marginLeft:155,
    bottom:25,
    left:60,
    height:35,
    width:35,
    backgroundColor:'#fff',
    borderRadius:20,
    borderColor:"dodgerblue",
    borderWidth:2
    
  },
  main:{
    marginBottom:100
  }
});
