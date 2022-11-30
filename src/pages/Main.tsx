import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Mapa from "./Mapa";
import Instrucoes from "./Instrucoes";
import Relatorios from "./Relatorios";
import Configuracoes from "./Configuracoes";

export default function Main() {
    return (
        <main className="bg-white dark:bg-gray-800 dark:text-white py-8 px-8 pl-12 h-full flex-1 overflow-y-scroll">
            <a href="http://ramonoliveira.dev" target="_blank" rel="noopener noreferrer" className="text-sm border-b-0 fixed right-8 z-10 dark:bg-gray-800 bottom-0 bg-gray-100 dark:border-gray-600 border-gray-300 border px-2 py-1 rounded-tl-md rounded-tr-md opacity-30 hover:opacity-100 transition-all duration-300 shadow-xl">
                <div className='flex justify-center items-center'>
                    <img className='w-3 invert dark:invert-0 mr-1' src="https://ramonoliveira.dev/wp-content/themes/ramonoliveira.dev/images/svg/logo.svg" alt="logo ramonoliveira.dev" />
                    <span className='font-semibold block'>ramonoliveira.dev</span>
                </div>
            </a>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/instrucoes" element={<Instrucoes />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
        </main>
    );
}