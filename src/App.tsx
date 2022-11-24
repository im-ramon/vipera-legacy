import { useContext, useEffect } from 'react'
import { AuthContext } from './contexts/auth.context';
import { SignIn } from './pages/SignIn';
import Router from './routes/routes';
import './styles/style.scss';
import { auth } from './services/firebase'
import Loading from './components/Loading';

function App() {
    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loading />
    }

    return (
        <div id='container' className='flex h-screen justify-center'>
            {user ? <Router /> : <SignIn />}
        </div>
    )
}

export default App;