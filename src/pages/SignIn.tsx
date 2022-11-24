import React, { useContext, useState } from 'react';

import { Box, Image } from '@chakra-ui/react';
import logo from '../assets/images/img/logo.png';
import { AuthContext } from '../contexts/auth.context';

export function SignIn() {
    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        signIn(email, password)
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <Box className='flex justify-center items-center'>
                <Image src={logo} className='w-8' /> <span className='font-handwrite  ml-2'>Vipera</span>
            </Box>
            <form className="space-y-6" onSubmit={e => handleSignIn(e)}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nome@email.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                    <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Manter conectado</label>
                    </div>
                    <a href="#" className="ml-auto text-sm text-primary hover:underline dark:text-blue-500">Esqueci a senha?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Ainda tem conta? <a href="#" className="text-primary hover:underline dark:text-blue-500">Criar uma conta</a>
                </div>
            </form>
        </div>

    );
}