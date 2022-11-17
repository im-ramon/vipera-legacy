import React, { useState, createContext, ReactNode } from 'react';

interface AppContextData {
    user: string;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)


export function AppProvider({ children }: AppProviderProps) {
    const [user, setUser] = useState<string>('')

    return (
        <AppContext.Provider value={{ user }}>
            {children}
        </AppContext.Provider>
    )
}