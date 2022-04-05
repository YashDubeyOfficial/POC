import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image,Button,style,TouchableOpacity} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import database, {firebase} from '@react-native-firebase/database';

export default function App({navigation,props}) {

  const [itemArray, setItemArray] = useState([])

  const LogOut = () =>{
  
  firebase.auth().signOut()
  console.log('User signed out!');
  navigation.replace('LoginScreen');
  
  }
  const readUserData = async () => {
   database().ref('/users/')
   .on('value', snapshot => {
    setItemArray(Object.values(snapshot.val()))
    
  });

  };
  return (
    <>
    <View style={{marginBottom:225}} >
      <View style={styles.title}>
        <Text style={{flex: 1, color: '#000', fontSize: 15}}>Name</Text>
        <Text style={{flex: 1, color: '#000', fontSize: 15}}>E-mail</Text>
        <Text style={{flex: 1, color: '#000', fontSize: 15}}>Phone Number</Text>
      </View>
      <Button
        title='GET User data'
        onPress={readUserData}
        color='#226557'
      />
      
     <FlatList
        data={itemArray}
        renderItem={({item})=>
        <TouchableOpacity onPress={()=>{navigation.navigate('EditUserScreen')}}>
          <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center',color:'green', marginTop:10,padding:25,borderBottomWidth:2}}>
            <Text style={{flex:1,color:'#000',fontSize:15,}}>{item.name}</Text>
            <Text style={{flex:1,color:'#000',fontSize:15,}}>{item.email}</Text>
            <Text style={{flex:1,color:'#000',fontSize:15,}}>{item.phone}</Text>
          </View>
            </TouchableOpacity>
        }
      />
     
      <View >
          <TouchableOpacity style={styles.lgt}
          
            onPress={LogOut}
          
          ><Text style={{color:'#fff'}}>LogOut</Text>
            </TouchableOpacity>
        

        <TouchableOpacity
        onPress={()=>navigation.navigate('CreateUserScreen')}
        style={styles.float}>
                <Image style={{width:50,height:50}}source={require('../assets/pluss.png')}/>
            </TouchableOpacity>
    </View>
    </View>
    </>

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
  tapLogin:{

    backgroundColor: '#226557',
    width:100,
    margin:100,
    color:'#fff',
    lineHeight:40,
    fontSize:20,
    textAlign:'center'
  },
  float:{
    width:45,
    height:45,
    position: 'absolute',
    bottom:2,
    right:5,
    borderRadius:25,
    justifyContent:'center',
    alignItems: 'center',
    borderColor:'#226557',
    borderWidth:3
  },
  lgt:{
    backgroundColor:'#226557',
    justifyContent:'center',
    alignItems: 'center',
    width:50,
    height:50,
    borderRadius:25,
    bottom:0,
    left:5,
    fontSize:5,
    
  }
});

