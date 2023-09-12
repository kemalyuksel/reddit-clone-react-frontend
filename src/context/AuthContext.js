import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, isAuthenticated: true };
        case 'LOGOUT_USER':
            localStorage.removeItem('username');
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};



export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // Tarayıcı açıldığında veya sayfa yenilendiğinde burada oturum durumunu kontrol et
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch({ type: 'LOGIN_USER' });
        } else {
            dispatch({ type: 'LOGOUT_USER' }); // Eğer token yoksa oturumu kapalı olarak işaretle
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
