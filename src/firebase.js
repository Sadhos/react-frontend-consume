// Import the functions you need from the SDKs you need
import React from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJXyvgq8XM6_uXUj_xG2XLPi3rE6Z21R0",
    authDomain: "logindemo-64454.firebaseapp.com",
    projectId: "logindemo-64454",
    storageBucket: "logindemo-64454.appspot.com",
    messagingSenderId: "426290454834",
    appId: "1:426290454834:web:5cc01ad32727601bd2772b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
export function useAuth() {
    const [currentUser, setCurrentUser] = React.useState();
    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => { setCurrentUser(user) })
        //console.log(unsub);
        return unsub;
    }, [])

    return currentUser;
}
export function logout() {
    return signOut(auth);
}
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export async function getUserName(email) {
    /* try
    {
         const usersRef = collection(db, "users");
         const q = await usersRef.where("email", "===", email).limit(1).get();
         if(!q.empty)
         {
             const user = q.docs[0];
             const {userName} = user.data();
             return userName;
         }
    }
    catch(err)
    {
     console.log(err);
    }  */
    try {
        const q = query(
            collection(db, "users"),
            where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        const user = data.map((user) => user.userName);
        return user;
    }catch(err)
    {
        console.log(err);
    }
}
export const db = getFirestore(app);