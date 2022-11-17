import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";

export default function Main() {
    return (
        <main className="bg-slate-400 py-8 px-8 h-full flex-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>
    );
}