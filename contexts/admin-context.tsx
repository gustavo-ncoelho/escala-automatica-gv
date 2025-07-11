"use client";

import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';
import {dataAtual} from "@/lib/utils";

type AdminContextType = {
    adminEscalaMode: string;
    setAdminEscalaMode: Dispatch<SetStateAction<string>>;
    anoSelecionado: number;
    setAnoSelecionado: Dispatch<SetStateAction<number>>;
    mesSelecionado: number;
    setMesSelecionado: Dispatch<SetStateAction<number>>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({children}: { children: ReactNode }) => {
    const [adminEscalaMode, setAdminEscalaMode] = useState<string>("mensal");
    const [anoSelecionado, setAnoSelecionado] = useState<number>(dataAtual.getFullYear());
    const [mesSelecionado, setMesSelecionado] = useState<number>(dataAtual.getMonth() + 1);

    return (
        <AdminContext.Provider value={{
            adminEscalaMode,
            setAdminEscalaMode,
            anoSelecionado,
            setAnoSelecionado,
            mesSelecionado,
            setMesSelecionado
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