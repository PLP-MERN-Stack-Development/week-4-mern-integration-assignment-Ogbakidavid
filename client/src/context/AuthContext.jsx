import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = JSON.parse(localStorage.getItem('user'));
                    setUser(userData)
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const register = async (userData) => {
        try {
            const { data } = await api.register(userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const login = async (userData) => {
        try {
            const { data } = await api.login(userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}