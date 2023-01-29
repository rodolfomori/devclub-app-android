/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import OneSignal from 'react-native-onesignal';
import Constants from 'expo-constants';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebase';
import FullHome from '../FullHome';
import BasicHome from '../BasicHome';

function App() {
  const [basicMode, setBasicMode] = useState(false);

  async function checkUpdates() {

    try {
      const colRef = collection(db, 'toggle_list');

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].basicMode;
      setBasicMode(docs);
    } catch (err) {
      setBasicMode(false);
      console.error(err);
    }
  }

  useEffect(() => {
    checkUpdates();
  }, []);

  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);

  OneSignal.promptForPushNotificationsWithUserResponse();

  // Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      const notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  // Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });

  return basicMode ? <BasicHome /> : <FullHome />;

}

export default App;
