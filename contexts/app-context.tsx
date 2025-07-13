"use client";

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type AppContextType = {
    isDesktop: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: { children: ReactNode }) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <AppContext.Provider value={{
            isDesktop
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