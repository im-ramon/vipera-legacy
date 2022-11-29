import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Mapa from "./Mapa";
import Instrucoes from "./Instrucoes";
import Relatorios from "./Relatorios";
import Perfil from "./Perfil";

export default function Main() {
    return (
        <main className="bg-white relative py-8 px-8 pl-12 h-full flex-1 overflow-y-scroll">
            <a href="http://ramonoliveira.dev" target="_blank" rel="noopener noreferrer" className="text-sm fixed right-8 z-10 bottom-0 bg-gray-100 border-gray-300 border px-2 py-1 rounded-tl-md rounded-tr-md opacity-30 hover:opacity-100 transition-all duration-300 shadow-xl">
                <div className='flex justify-center items-center'>
                    <img className='w-3 invert mr-1' src="https://ramonoliveira.dev/wp-content/themes/ramonoliveira.dev/images/svg/logo.svg" alt="logo ramonoliveira.dev" />
                    <span className='font-semibold block'>ramonoliveira.dev</span>
                </div>
            </a>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/instrucoes" element={<Instrucoes />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </main>
    );
}