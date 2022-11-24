import { createBrowserRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Aside from '../components/Aside';
import Main from '../pages/Main';
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Aside />
            <Main />
        </BrowserRouter>
    );
}