import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image,Button,style,TouchableOpacity,TextInput} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import database, {firebase} from '@react-native-firebase/database';
import { back } from 'react-native/Libraries/Animated/Easing';

export default function App({navigation,props}) {

  const [itemArray, setItemArray] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  
  //LogOut from ReactNativeFirebase phone Authentication
  const LogOut = () =>{    
      firebase.auth().signOut()
      console.log('User signed out!');
      navigation.replace('LoginScreen');
  }

  //ReadUser data from rnFirebase realtime DB
  const readUserData = async () => {
   database().ref('/Users/')
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

  const SearchBtn = 
    // alert(search)
    filteredData.filter((val) =>{
      if (search == ''){
        return(val)
       }else if (
         val.name.toLowerCase().includes(search.toLowerCase()) || 
         val.email.toLowerCase().includes(search.toLowerCase()) || 
         val.phone.toString().toLowerCase().includes(search.toString().toLowerCase()) 
       ){
          return(val) 
       }
    })                  

    
  
  
  return (
  
      
    <View style={{marginBottom:180,paddingBottom:5}} >
    
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
    </View>

        <FlatList
            data={SearchBtn}
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
                      style={{backgroundColor:'#64beff',width:70,marginTop:10,borderRadius:5}}>
                      <Text style={{padding:7}}>Edit user</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            }
            
          />
          <View style={{flexDirection:'row',justifyContent:"space-evenly",marginTop:10}}>

              <TouchableOpacity style={styles.lgt}
              onPress={readUserData}>
                <Text style={{color:'#fff'}}>Fetch Data</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={()=>navigation.navigate('CreateUserScreen')}
              style={styles.lgt}>
                <Text style={{color:'#fff'}}>Add User</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.lgt}
              onPress={LogOut}>
                <Text style={{color:'#fff'}}>LogOut</Text>
              </TouchableOpacity>
            
          </View>
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
    width:370,
    margin: 10,
    borderWidth: 1,
    borderRadius:5,
    padding:11

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

