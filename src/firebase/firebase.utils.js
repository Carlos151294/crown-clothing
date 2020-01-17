import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDrtUXI9k5WqAnClmzJXKvwtyYZGL2LTD0",
    authDomain: "crown-db-e484d.firebaseapp.com",
    databaseURL: "https://crown-db-e484d.firebaseio.com",
    projectId: "crown-db-e484d",
    storageBucket: "crown-db-e484d.appspot.com",
    messagingSenderId: "1008709511383",
    appId: "1:1008709511383:web:58d375e6af561a1a646892"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'  });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;