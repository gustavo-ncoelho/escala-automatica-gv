"use client";

import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';
import {dataAtual} from "@/lib/utils";

type UserContextType = {
    anoSelecionado: string;
    setAnoSelecionado: Dispatch<SetStateAction<string>>;
    mesSelecionado: string;
    setMesSelecionado: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [anoSelecionado, setAnoSelecionado] = useState<string>(String(dataAtual.getFullYear()));
    const [mesSelecionado, setMesSelecionado] = useState<string>(String(dataAtual.getMonth() + 1));

    return (
        <UserContext.Provider value={{
            anoSelecionado,
            setAnoSelecionado,
            mesSelecionado,
            setMesSelecionado
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext deve ser usado dentro de um UserProvider');
    }
    return context;
};