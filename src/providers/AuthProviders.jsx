import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app); 

const AuthProviders = ({children}) => { 
    const [user, setUser] = useState(null)  
    const [loading, setLoading] = useState(true)
    
    // 1.Create user
    const createUser = (email, password) => { 
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }
    // 2. SignIn user
     const signIn = (email,password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
     } 
    //  3. signOut Or logOut  
    const logOut = () => {
      setLoading(true)
      signOut(auth)
    }



    useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('Current User: ', currentUser)
            setLoading(false)
        }) 
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      logOut,
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;