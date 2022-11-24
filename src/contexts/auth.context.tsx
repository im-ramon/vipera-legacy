import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { EmailAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase'

interface AuthContextData {
    user: string;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function signIn(email: string, password: string) {
        const provider = new EmailAuthProvider();
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user.uid)
                localStorage.setItem('@vipera:user', JSON.stringify(result.user.uid))
            })
            .catch((error) => {
                console.log(error.code)
            })
    }

    function signOut() {
        auth.signOut();
        setUser('')
    }


    function checkIfUserIsLogged() {
        setIsLoading(true)
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user.uid)
            } else {
                console.log('Não há usuário logado')
            }
        })

        setIsLoading(false)
    }

    useEffect(() => {
        checkIfUserIsLogged()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser, setIsLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}