import { useContext, useEffect } from 'react'
import { AuthContext } from './contexts/auth.context';
import { SignIn } from './pages/SignIn';
import Router from './routes/routes';
import './styles/style.scss';
import Loading from './components/Loading';
import { useDarkMode } from 'usehooks-ts'

function App() {
    const { user, isLoading } = useContext(AuthContext)
    const { isDarkMode } = useDarkMode()

    if (isLoading) {
        return <Loading />
    }

    return (
        <div id='container' className={`flex h-screen justify-center ${isDarkMode ? 'dark' : 'light'}`}>
            {user ? <Router /> : <SignIn />}
        </div>
    )
}

export default App;