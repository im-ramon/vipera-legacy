import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { AppProvider } from './contexts/app.context';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </AppProvider>
    </React.StrictMode>
)
