"use client";

import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {dataAtual} from "@/lib/utils";

type AdminContextType = {
    adminEscalaMode: string;
    setAdminEscalaMode: Dispatch<SetStateAction<string>>;
    anoSelecionado: number;
    setAnoSelecionado: Dispatch<SetStateAction<number>>;
    mesSelecionado: number;
    setMesSelecionado: Dispatch<SetStateAction<number>>;
    isDesktop: boolean;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({children}: { children: ReactNode }) => {
    const [adminEscalaMode, setAdminEscalaMode] = useState<string>("mensal");
    const [anoSelecionado, setAnoSelecionado] = useState<number>(dataAtual.getFullYear());
    const [mesSelecionado, setMesSelecionado] = useState<number>(dataAtual.getMonth() + 1);
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
        <AdminContext.Provider value={{
            adminEscalaMode,
            setAdminEscalaMode,
            anoSelecionado,
            setAnoSelecionado,
            mesSelecionado,
            setMesSelecionado,
            isDesktop
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = (): AdminContextType => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdminContext deve ser usado dentro de um AdminProvider');
    }
    return context;
};