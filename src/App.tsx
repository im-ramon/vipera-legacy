import { useContext } from 'react'
import { AppContext } from './contexts/app.context';
import { Login } from './pages/Login';
import Router from './routes/routes';
import './styles/style.scss';

function App() {
    const { user } = useContext(AppContext)
    return (
        <div id='container' className='flex h-screen justify-center'>
            {user ? <Router /> : <Login />}
        </div>
    )
}

export default App;