import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { AppProvider } from './contexts/app.context';
import { AuthProvider } from './contexts/auth.context';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <AppProvider>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </AppProvider>
        </AuthProvider>
    </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
