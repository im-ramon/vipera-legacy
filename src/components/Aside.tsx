import { Box, Button, Collapse, Image, useDisclosure } from '@chakra-ui/react'
import logo from '../assets/images/img/logo.png'
import { BiHomeAlt, BiMap, BiNotepad, BiStats, BiUserPlus, BiUserMinus, BiUserX, BiListUl, BiLogOutCircle } from "react-icons/bi";
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

export default function Aside() {
    const [showAside, setShowAside] = useState<boolean>(true)

    return (
        <aside className={`flex flex-col  relative transition-all duration-300 bg-white h-full w-${showAside ? '96' : '0'} border-${showAside ? 'r' : 'none'}`}>
            <div className='absolute top-4 right-0 translate-x-8 w-8 h-8 flex justify-center items-center bg-white cursor-pointer' onClick={() => setShowAside(!showAside)}>
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
                    <li className="px-5 bg-gray-50">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiHomeAlt size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiMap size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Mapa</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiNotepad size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Instruções</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiStats size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Estatísticas</span>
                        </a>
                    </li>
                    <li className="px-5 bg-gray-50">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Visitantes</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiUserPlus size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Registrar chegada</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiUserMinus size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Registrar saída</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiUserX size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Excluir dados</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-primary pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <BiListUl size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Listar todos</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div className='mt-auto'>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-danger pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <BiLogOutCircle />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Sair</span>
                </a>
            </div>
        </aside>
    )
}