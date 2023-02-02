import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';

import { auth } from '@/services/firebase';
import { Box, Button, Divider, Image, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiOutlineKey, HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useDarkMode } from 'usehooks-ts';
import logo from '../assets/images/img/logo.png';


export function SignIn() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isDarkMode } = useDarkMode()
    const toast = useToast()

    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(true)

    function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        signIn(email, password)
    }

    function handlePasswordReset() {
        const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!emailValidator.test(email)) {
            toast({
                title: 'Por favor, digite um e-mail válido para continuar.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        } else {
            setIsLoading(true)
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast({
                        title: 'O link de recuperação foi encaminhado para seu e-mail!',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                })
                .catch((error) => {
                    console.log('error.code:', error.code)
                    console.log('error.message:', error.message)
                    toast({
                        title: 'Não foi possível enviar o link de recuperação',
                        description: 'Tente novamente mais tarde',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                    onClose()
                });
        }
    }

    return (
        <>
            <div className="w-full self-center rounded-md max-w-sm p-4 border border-gray-100 dark:border-primary-900 shadow-xl sm:p-6 md:p-8 dark:bg-gray-800">
                <Divider className='dark:border-gray-600' />
                <Box className='flex justify-center items-center rounded-md py-3 select-none '>
                    <Image src={logo} className='w-10 mr-1' /> <span className='font-handwrite ml-2 text-4xl text-gray-600 dark:text-white'>Vipera</span>
                </Box>
                <Divider className='dark:border-gray-600' />
                <form className="space-y-6" onSubmit={e => handleSignIn(e)}>
                    <div className='flex justify-center items-center mt-4'>
                        <HiOutlineLockClosed className='inline mr-1' />
                        <h5 className="text-md font-medium text-text dark:text-white">Login</h5>
                    </div>
                    <div>
                        <InputGroup
                            className='bg-slate-200 rounded-md dark:border-gray-600 dark:bg-gray-700'
                        >
                            <InputLeftElement
                                pointerEvents='none'
                                children={<HiOutlineMail className='text-gray-700 dark:text-white' />}
                            />
                            <Input type="email" name="email" id="email" placeholder='seuemail@email.com' value={email} onChange={(event) => setEmail(event.target.value)} className="focus:outline-primary-700 focus:border-none text-text dark:text-white" />
                        </InputGroup>
                    </div>
                    <div>
                        <InputGroup
                            className='bg-slate-200 rounded-md dark:border-gray-600 dark:bg-gray-700'
                        >
                            <InputLeftElement
                                pointerEvents='none'
                                children={<HiOutlineKey className='text-gray-700 dark:text-white' />}
                            />
                            <Input type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="focus:outline-primary-700 px-0 focus:border-none text-text dark:text-white bg-slate-50" />
                            <InputRightElement width='4.5rem'>
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                    {showPassword ? <AiOutlineEyeInvisible className='text-gray-700 dark:text-white translate-x-3' /> : <AiOutlineEye className='text-gray-700 dark:text-white translate-x-3' />}
                                </span>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                    <div className="flex items-start">
                        <a onClick={onOpen} className="cursor-pointer ml-auto text-sm text-primary-900 hover:underline dark:text-white">Esqueceu a senha?</a>
                    </div>
                    <Button type="submit" colorScheme="green" className="w-full">Entrar</Button>
                    {/* 
                <button type="submit" className="w-full text-white bg-primary-900 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Ainda tem conta? <a href="#" className="text-primary-900 hover:underline ">Criar uma conta</a>
            </div> */}
                </form>
                <div className='mt-8 opacity-40 hover:opacity-100 transition-all dark:text-white'>
                    <p className='text-xs select-none'>Desenvolvido por: </p>
                    <div className='flex justify-center items-center'>
                        <img className='w-4 invert dark:invert-0 mr-1' src="https://ramonoliveira.dev/wp-content/themes/ramonoliveira.dev/images/svg/logo.svg" alt="logo ramonoliveira.dev" />
                        <a className='font-bold block' href="http://ramonoliveira.dev" target="_blank" rel="noopener noreferrer">ramonoliveira.dev</a>
                    </div>
                </div>
            </div >

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className={`${isDarkMode ? 'dark' : 'light'}`}>
                    <ModalHeader className='dark:bg-gray-800 dark:text-white'>Recuperar senha de acesso</ModalHeader>
                    <ModalCloseButton className="dark:text-white" />
                    <ModalBody className='dark:bg-gray-800 dark:text-white'>
                        <Text className='text-sm mb-4'>Digite seu e-mail para solicitar o envio do link de recuperação de senha.</Text>
                        <InputGroup
                            className='bg-slate-200 rounded-md dark:border-gray-600 dark:bg-gray-700'
                        >
                            <InputLeftElement
                                pointerEvents='none'
                                children={<HiOutlineMail className='text-gray-700 dark:text-white' />}
                            />
                            <Input type="email" name="email" id="email" placeholder='seuemail@email.com' value={email} onChange={(event) => setEmail(event.target.value)} className="focus:outline-primary-700 focus:border-none text-text dark:text-white" />
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter className='dark:bg-gray-800 dark:text-white'>
                        <Button isLoading={isLoading} colorScheme='green' mr={3} leftIcon={<IoPaperPlaneOutline />} onClick={handlePasswordReset}>
                            Enviar
                        </Button>
                        <Button onClick={onClose} variant='ghost' className="dark:hover:bg-gray-600 dark:border-gray-600">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}