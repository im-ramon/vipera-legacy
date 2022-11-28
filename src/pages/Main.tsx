import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Mapa from "./Mapa";
import Instrucoes from "./Instrucoes";
import Relatorios from "./Relatorios";
import Perfil from "./Perfil";

export default function Main() {
    return (
        <main className="bg-white py-8 px-8 pl-12 h-full flex-1 overflow-y-scroll">
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