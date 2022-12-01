import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { EmailAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase'
import { useToast } from '@chakra-ui/react';
import { useTimeout } from 'usehooks-ts';

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
    const toast = useToast()

    const [user, setUser] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function signIn(email: string, password: string) {
        setIsLoading(true)
        const provider = new EmailAuthProvider();
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user.uid)
                localStorage.setItem('@vipera:user', JSON.stringify(result.user.uid))
            })
            .catch((error) => {
                console.log(error.code)
                toast({
                    title: 'Nâo foi possível fazer login',
                    description: 'Verifique os dados digitados, sua conexão com a internet, ou tente novamente mais tarde.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function signOut() {
        auth.signOut();
        setUser('')
    }

    function checkIfUserIsLogged() {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user.uid)
            } else {
                console.log('Não há usuário logado')
            }
        })
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