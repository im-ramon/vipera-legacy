import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';

import { Image } from '@chakra-ui/react'
import { BiHomeAlt, BiMap, BiNotepad, BiLogOutCircle, BiPrinter, BiUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
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
        <aside className={`flex shadow-md flex-col relative transition-all duration-300 bg-white h-full ${showAside ? 'w-64 border-r' : 'w-0 border-none'}`}>
            <div className={`absolute top-3 right-0 rounded-tr-md rounded-br-md translate-x-8 w-8 h-8 flex justify-center items-center bg-white cursor-pointer border border-l-0 ${showAside ? '' : 'shadow-md'}`} onClick={() => setShowAside(!showAside)}>
                {showAside ? <GrClose /> : <GiHamburgerMenu />}
            </div>
            <div className="flex items-center justify-center h-14 border-b overflow-hidden">
                <div className='flex items-center justify-center select-none'>
                    <Image className='w-9' id='logo' src={logo} alt='Dan Abramov' />
                    <strong className='font-handwrite text-3xl ml-2 text-gray-600'>Vipera</strong>
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

                    <li className="px-5 bg-gray-50">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Visitantes</div>
                        </div>
                    </li>

                    <RegistrarChegada />
                    <RegistrarSaida />
                    <ExcluirDados />

                    <li className="px-5 bg-gray-50">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Usuário</div>
                        </div>
                    </li>

                    <AsideLinks to='perfil' title='Perfil'>
                        <BiUser size={20} />
                    </AsideLinks>
                </ul>

            </div>
            <div className='mt-auto' onClick={() => { signOut() }}>
                <NavLink to={'/'} className="relative before:bg-green-500 flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-danger pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <BiLogOutCircle />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Sair</span>
                </NavLink>
            </div>
        </aside>
    )
}