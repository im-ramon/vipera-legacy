import { BrowserRouter, HashRouter } from "react-router-dom";
import Aside from '../components/Aside';
import Main from '../pages/Main';

export default function Router() {
    return (
        <HashRouter>
            <Aside />
            <Main />
        </HashRouter>
    );
}