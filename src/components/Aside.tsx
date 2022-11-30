import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';

import { Image } from '@chakra-ui/react'
import { BiHomeAlt, BiMap, BiNotepad, BiLogOutCircle, BiPrinter, BiCog } from "react-icons/bi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import AsideLinks from './_parts/AsideLinks';
import RegistrarChegada from '../pages/RegistrarChegada';
import RegistrarSaida from '../pages/RegistrarSaida';
import logo from '../assets/images/img/logo.png'
import ExcluirDados from '../pages/ExcluirDados';
import { NavLink } from 'react-router-dom';

export default function Aside() {
    const [showAside, setShowAside] = useState<boolean>(true)

    const { signOut } = useContext(AuthContext)

    return (
        <aside className={`flex shadow-md flex-col relative transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white h-full ${showAside ? 'w-64 border-r dark:border-r-gray-700' : 'w-0 border-none'}`}>
            <div className={`absolute top-3 right-0 rounded-tr-md rounded-br-md translate-x-8 w-8 h-8 flex justify-center items-center bg-white dark:bg-gray-800 dark:text-white cursor-pointer border dark:border-gray-600 border-l-0 ${showAside ? '' : 'shadow-md'}`} onClick={() => setShowAside(!showAside)}>
                {showAside ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            <div className="flex items-center justify-center h-14 border-b dark:border-b-gray-700 overflow-hidden">
                <div className='flex items-center justify-center select-none'>
                    <Image className='w-9' id='logo' src={logo} alt='Dan Abramov' />
                    <strong className='font-handwrite text-3xl ml-2 text-gray-600 dark:text-white'>Vipera</strong>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                    <AsideLinks to='' title='Dashboard'>
                        <BiHomeAlt size={20} />
                    </AsideLinks>

                    <AsideLinks to='mapa' title='Mapa'>
                        <BiMap size={20} />
                    </AsideLinks>

                    <AsideLinks to='instrucoes' title='Instruções'>
                        <BiNotepad size={20} />
                    </AsideLinks>

                    <AsideLinks to='relatorios' title='Relatórios'>
                        <BiPrinter size={20} />
                    </AsideLinks>

                    <li className="px-5 bg-gray-50 dark:bg-gray-700 ">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500 dark:text-white">Visitantes</div>
                        </div>
                    </li>

                    <RegistrarChegada />
                    <RegistrarSaida />
                    <ExcluirDados />

                    <li className="px-5 bg-gray-50 dark:bg-gray-700 ">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500 dark:text-white">Usuário</div>
                        </div>
                    </li>

                    <AsideLinks to='configuracoes' title='Configurações'>
                        <BiCog size={20} />
                    </AsideLinks>
                </ul>

            </div>
            <div className='mt-auto' onClick={() => { signOut() }}>
                <NavLink to={'/'} className="relative before:bg-green-500 flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-white hover:text-gray-800 border-l-4 border-transparent hover:border-danger pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <BiLogOutCircle />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Sair</span>
                </NavLink>
            </div>
        </aside>
    )
}