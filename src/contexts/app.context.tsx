import { createContext, ReactNode } from 'react';

interface AppContextData {
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)


export function AppProvider({ children }: AppProviderProps) {
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}