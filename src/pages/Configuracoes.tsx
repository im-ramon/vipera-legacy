import React, { useEffect, useState } from 'react';
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import PageHeader from '../components/_parts/PageHeader';
import { auth } from '../services/firebase';
import { Button, Collapse, useDisclosure, useToast } from '@chakra-ui/react';
import { useDarkMode } from 'usehooks-ts'
import { BiMoon, BiSun } from 'react-icons/bi';

export default function Configuracoes() {
    const { isDarkMode, toggle } = useDarkMode()

    const [userEmail, setUserEmail] = useState<string>('')
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { isOpen, onToggle } = useDisclosure()
    const toast = useToast()


    function getUserInfo() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email ?? '')
            } else {
                console.log('Não há dados para o usários solicitado')
            }
        });
    }

    function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        e.preventDefault()
        const user = auth.currentUser;

        if (user && newPassword == confirmNewPassword) {

            const credential = EmailAuthProvider.credential(
                userEmail,
                currentPassword
            )

            reauthenticateWithCredential(user, credential).then(() => {
                console.log('Usário reautenticado!')

                updatePassword(user, newPassword)
                    .then(() => {
                        toast({
                            title: 'Senha alterada com sucesso!',
                            status: 'success',
                            duration: 4000,
                            isClosable: true,
                        })
                    }).catch((error) => {
                        console.log(error)
                        toast({
                            title: 'Desculpe!',
                            description: 'Algo deu errado, não foi possível alterar a senha. Tente novamente mais tarde.',
                            status: 'error',
                            duration: 4000,
                            isClosable: true,
                        })
                    });
            }).catch((error) => {
                console.log(error)
                console.log('Não foi possível reautenticar o usuário.')
                toast({
                    title: 'Desculpe!',
                    description: 'Algo deu errado, não foi possível alterar a senha. Tente novamente mais tarde.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }).finally(() => {
                setIsLoading(false)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmNewPassword('')
            })

        } else {
            toast({
                title: 'Verifique os dados digitidos!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            })
        }
    }


    useEffect(() => {
        getUserInfo()
        document.title = 'Vipera | Configurações'
    }, [])

    return (
        <>
            <PageHeader title='Configurações' subtitle='Configurações gerais do aplicativo' />
            <div>
                <form onSubmit={(e) => handleUpdatePassword(e)}>
                    <div>
                        <div className='flex-1'>
                            <label htmlFor="email" className="block dark:text-white mb-2 text-sm font-medium text-left text-gray-900">Email</label>
                            <div className="flex">
                                <input type="email" value={userEmail} id="email" disabled className="bg-gray-50 focus:ring-primary-300 focus:ring-2 outline-none border dark:text-white dark:border-gray-600 dark:bg-gray-700 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="john.doe@company.com" required />
                                <Button onClick={onToggle} colorScheme='green' variant={'outline'} className='ml-4 dark:text-primary-900'>{isOpen ? 'Fechar' : 'Alterar senha'}</Button>
                            </div>
                        </div>
                    </div>
                    <Collapse in={isOpen} animateOpacity>
                        <div className="grid gap-6 my-6 grid-cols-3">
                            <div>
                                <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Senha atual</label>
                                <input type="password" id="current_password" value={currentPassword} onChange={e => { setCurrentPassword(e.target.value) }} className={`bg-gray-50 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-300 focus:ring-2 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5`} placeholder="•••••••••" required />
                            </div>
                            <div >
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Nova senha</label>
                                <input type="password" minLength={6} maxLength={64} value={newPassword} onChange={e => { setNewPassword(e.target.value) }} id="password" className={`bg-gray-50 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-300 focus:ring-2 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5`} placeholder="•••••••••" required />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Confirme a nova senha</label>
                                <input type="password" minLength={6} maxLength={64} value={confirmNewPassword} onChange={e => { setConfirmNewPassword(e.target.value) }} id="confirm_password" className={`bg-gray-50 dark:border-gray-600 dark:bg-gray-700 border focus:ring-primary-300 focus:ring-2 outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${newPassword !== confirmNewPassword ? 'border-danger bg-red-100' : ''}`} placeholder="•••••••••" required />
                                <p className={`text-right text-xs text-danger pr-1 ${newPassword !== confirmNewPassword ? 'opacity-100' : 'opacity-0'}`}>As senhas não conferem.</p>
                            </div>
                        </div>
                        <Button isLoading={isLoading} type="submit" colorScheme='green' className='ml-4'>Salvar</Button>
                    </Collapse>
                </form>
                <div className='mt-8 flex flex-col items-start' >
                    <label htmlFor="color_scheme" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Perfil de cor</label>
                    <div className='bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border rounded-md p-2.5 flex items-center justify-center'>
                        <label className="inline-flex relative items-center justify-start cursor-pointer">
                            <input type="checkbox" id='color_scheme' value={""} checked={isDarkMode} onChange={toggle} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-900"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isDarkMode ? 'Escuro' : 'Claro'}</span>
                            {isDarkMode ? <BiMoon className='ml-2 dark:text-gray-300' /> : <BiSun className='ml-2' />}
                        </label>
                    </div>
                </div>

            </div>
        </>
    );
}