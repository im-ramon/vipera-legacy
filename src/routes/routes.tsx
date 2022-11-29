import { createBrowserRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Aside from '../components/Aside';
import Main from '../pages/Main';
import Dashboard from "../pages/Dashboard";

export default function Router() {
    return (
        <BrowserRouter>
            <Aside />
            <Main />
        </BrowserRouter>
    );
}