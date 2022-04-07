import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'The old token');
  if (!fcmToken) {
    try {
      const fcnToken = await messaging().getToken();
      if (!fcmToken) {
        console.log(fcmToken, 'The new Generated Token');
        await AsyncStorage.setItem('fcmToken', fcnToken);
      }
    } catch (error) {
      console.log(error, 'error raised');
      alert('error message')
    }
  }
};

export const notificationListner = async() =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
    });

    messaging().onMessage(async remoteMessage =>
        {
            console.log("received in foreground", remoteMessage)
        })

        
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
           
          }
          
        });
     
}