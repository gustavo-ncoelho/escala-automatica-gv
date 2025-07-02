"use client";

import React, {createContext, ReactNode, useContext, useState} from 'react';

type AppContextType = {
    adminEscalaMode: string;
    setAdminEscalaMode: (value: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: { children: ReactNode }) => {
    const [adminEscalaMode, setAdminEscalaMode] = useState<string>("mensal");

    return (
        <AppContext.Provider value={{
            adminEscalaMode,
            setAdminEscalaMode
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext deve ser usado dentro de um AppProvider');
    }
    return context;
};