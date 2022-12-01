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

    useEffect(() => {
        const htmlClassList = document.querySelector('html')?.classList
        document.querySelector('body')?.classList.add('dark:bg-gray-800')
        if (isDarkMode) {
            htmlClassList?.add('dark')
            htmlClassList?.remove('light')
        } else {
            htmlClassList?.add('light')
            htmlClassList?.remove('dark')
        }
    }, [isDarkMode])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div id='container' className="flex h-screen justify-center">
            {user ? <Router /> : <SignIn />}
        </div>
    )
}

export default App;