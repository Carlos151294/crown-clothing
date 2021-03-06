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

export const createUserProfileDocument = async (userAuth) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();
    
    //  Checks if user exists in database
    if (!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt
            })
        } catch(e) {
            console.log('Error creating user', e.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        // Generate a new doc ref with random id
        const docRef = collectionRef.doc();
        batch.set(docRef, object)
    });

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator; 
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'  });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;