import React, { useContext, useState } from 'react';
import { HiOutlineKey, HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { Box, Image, Input, InputGroup, InputLeftElement, Divider } from '@chakra-ui/react';
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
        <div className="w-full self-center rounded-md max-w-sm p-4 border border-gray-100 shadow-xl sm:p-6 md:p-8">
            <Divider />
            <Box className='flex justify-center items-center rounded-md py-3 select-none'>
                <Image src={logo} className='w-10 mr-1' /> <span className='font-handwrite ml-2 text-4xl text-gray-600'>Vipera</span>
            </Box>
            <Divider />
            <form className="space-y-6" onSubmit={e => handleSignIn(e)}>
                <div className='flex justify-center items-center mt-4'>
                    <HiOutlineLockClosed className='inline mr-1' />
                    <h5 className="text-md font-medium text-text">Login</h5>
                </div>
                <div>
                    <InputGroup
                        className='bg-slate-200 rounded-md'
                    >
                        <InputLeftElement
                            pointerEvents='none'
                            children={<HiOutlineMail color='gray.300' />}
                        />
                        <Input type="email" name="email" id="email" placeholder='email@email.com' value={email} onChange={(event) => setEmail(event.target.value)} className="focus:outline-primary-700 focus:border-none text-text" />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup
                        className='bg-slate-200 rounded-md'
                    >
                        <InputLeftElement
                            pointerEvents='none'
                            children={<HiOutlineKey color='gray.300' />}
                        />
                        <Input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="focus:outline-primary-700 focus:border-none text-text bg-slate-50" />
                    </InputGroup>
                </div>
                <div className="flex items-start">
                    <a href="#" className="ml-auto text-sm text-primary-900 hover:underline">Esqueci a senha?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-900 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Ainda tem conta? <a href="#" className="text-primary-900 hover:underline ">Criar uma conta</a>
                </div> */}
            </form>
        </div>

    );
}