import { createBrowserRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Aside from '../components/Aside';
import Main from '../components/Main';
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Aside />
            <Main />
        </BrowserRouter>
    );
}