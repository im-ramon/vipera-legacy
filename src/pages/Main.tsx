import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Mapa from "./Mapa";
import Instrucoes from "./Instrucoes";
import Estatisticas from "./Estatisticas";

export default function Main() {
    return (
        <main className="bg-slate-400 py-8 px-8 h-full flex-1">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/instrucoes" element={<Instrucoes />} />
                <Route path="/estatisticas" element={<Estatisticas />} />
            </Routes>
        </main>
    );
}