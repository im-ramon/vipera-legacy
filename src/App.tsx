import './styles/style.scss';
import Aside from './components/Aside';
import Main from './components/Main';

function App() {
    return (
        <div id='container' className='flex h-screen'>
            <Aside />
            <Main />
        </div>
    )
}

export default App;