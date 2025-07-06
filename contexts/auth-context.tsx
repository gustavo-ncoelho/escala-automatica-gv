"use client";

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {obterUsuario} from "@/actions/session-actions/obter-usuario";
import {UsuarioPayload} from "@/types/auth/usuario";

type AuthContextType = {
    usuario: UsuarioPayload | undefined;
    atualizarSessao: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<UsuarioPayload | undefined>(undefined);

    const atualizarSessao = async () => {
        const userData = await obterUsuario();
        const novoUsuario = userData.success ? userData.data : undefined;
        if (novoUsuario) {
            setUsuario(novoUsuario);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await obterUsuario();
                if (userData && userData.success) {
                    setUsuario(userData.data);
                } else {
                    setUsuario(undefined);
                }
            } catch (error) {
                console.error("Falha ao buscar usuário no AuthProvider:", error);
                setUsuario(undefined);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            usuario,
            atualizarSessao
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};