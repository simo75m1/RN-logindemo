import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, 
  signOut, ReactNativeAsyncStorage, initializeAuth, getReactNativePersistence} from 'firebase/auth'
import {app, database} from './firebase.js'
import { useEffect, useState } from 'react';

let auth
  if(Platform.OS === 'web'){
    auth = getAuth(app)
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })
  }

export default function App() {

  const [userID, setUserID] = useState(null)

  useEffect (() => {
    const auth_ = getAuth()
    const unsubscribe = onAuthStateChanged(auth_, (currentUser) => {
      if(currentUser){
        console.log("Lytter siger: logget ind som "+currentUser.uid)
        setUserID(currentUser.uid)
      } else {
        console.log("Lytter siger: Ikke logget ind")
      }
    })
    return () => unsubscribe() //Når komponent unmountes, sluk for listener
  }, []) //Tomt array = kun én gang


  async function login(){
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "test@kea.dk", "123456")
      console.log("logget ind som "+ userCredential.user.uid)
    } catch (error) {
      console.log("fejl i login: "+ error)
    }
  }

  async function signup(){
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, "test2@kea.dk", "123456")
      console.log("signet up som "+ userCredential.user.uid)
    } catch (error) {
      console.log("fejl i login: "+ error)
    }
  }
  

  async function sign_Out(){
    await signOut(auth)
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Log in" onPress={login}></Button>
      <Button title="Sign out" onPress={sign_Out}></Button>
{ userID && 
    <>
      <Text>Du er logget ind!</Text>
      <Text>De 2 tomme tags udenom, lader dig vise en hel gruppe af tags, hvis if statementet ovenfor
        er true
      </Text>
    </>
}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
