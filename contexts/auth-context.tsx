"use client";

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {obterUsuario} from "@/actions/session-actions/obter-usuario";
import {UsuarioPayload} from "@/types/auth/usuario";

type AuthContextType = {
    usuario: UsuarioPayload | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<UsuarioPayload | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await obterUsuario();
                if (userData && userData.success) {
                    setUsuario(userData.data);
                } else {
                    setUsuario(null);
                }
            } catch (error) {
                console.error("Falha ao buscar usuário no AuthProvider:", error);
                setUsuario(null);
            }
        };

        fetchUser();
    }, []);

        return (
            <AuthContext.Provider value={{
                usuario
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