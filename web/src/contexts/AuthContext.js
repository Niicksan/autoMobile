import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    const [auth, setAuth] = useLocalStorage('auth', {});
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState({
        email: true,
        companyName: true,
        password: true,
        confirmPassword: true,
        isUserExist: '',
        invalidLoginData: ''
    });

    useEffect(() => {
        setError({
            email: true,
            companyName: true,
            password: true,
            confirmPassword: true,
            isUserExist: '',
            invalidLoginData: ''
        });
    }, [pathname]);

    const authService = authServiceFactory(auth.authToken);

    const onLoginSubmit = async (loginFormData) => {
        try {
            const response = await authService.login(loginFormData);

            if (response?.user.id) {
                setAuth(response?.user);
                navigate('/catalog/vehicles');
            } else {
                setError({ ...error, invalidLoginData: response?.message });
            }
        } catch (err) {
            setError({ ...error, invalidLoginData: err?.message });
            console.log(error.invalidLoginData);
            console.log('Please check your email or password', err);
        }

        setTimeout(() => {
            setError({ ...error, invalidLoginData: '' });
        }, 5000);
    };

    const onRegisterSubmit = async (registerFormData) => {
        try {
            const response = await authService.register(registerFormData);

            if (response?.user.id) {
                setAuth(response?.user);
                navigate('/catalog/vehicles');
            } else {
                setError({ ...error, isUserExist: response?.message });
            }
        } catch (err) {
            setError({ ...error, isUserExist: err?.message });
            console.log('There is a problem', err);
        }

        setTimeout(() => {
            setError({ ...error, isUserExist: '' });
        }, 5000);
    };


    const onLogout = async () => {
        await authService.logout();

        setProfileData({});
        setAuth({});
    };

    const contextValues = {
        profileData,
        setProfileData,
        error,
        setError,
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth.id,
        userEmail: auth.email,
        isAuthenticated: !!auth.id,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};