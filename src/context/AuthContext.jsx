import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../firebase/firebase.config';
export const UserProvider = createContext(null)

const AuthContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)
    const [userPhoto, setUserPhoto] = useState('')
    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        console.log('dfsdajkh')
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoader(false)
        });
        return () => {
            return unSubscribe()
        }
    }, [])



    const sendValue = {
        createUser,
        signIn,
        logOut,
        googleSignIn,

        // 
        user,
        loader,
        setUserPhoto,
        userPhoto,

    }
    return (
        <UserProvider.Provider value={sendValue}>
            {children}
        </UserProvider.Provider>
    );
};

export default AuthContext;