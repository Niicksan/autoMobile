import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export const useAuthValidation = () => {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { error, setError, onLoginSubmit, onRegisterSubmit } = useAuthContext();
    const [isLoginFormValid, setIsLoginFormValid] = useState(false);
    const [isRegFormValid, setIsRegFormValid] = useState(false);
    const [user, setUser] = useState({
        email: '',
        companyName: '',
        password: '',
        confirmPassword: '',
    })

    const handleClickEmail = (e) => {
        if (emailRegex.test(e.target.value)) {
            setError({ ...error, email: true });
        } else {
            setError({ ...error, email: false });
        }

        setUser({ ...user, email: e.target.value });
    };

    const handleClickCompanyName = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, companyName: true });
        } else {
            setError({ ...error, companyName: false });
        }

        setUser({ ...user, companyName: e.target.value });
    };

    const handleClickPassword = (e) => {
        if ((e.target.value).length > 4) {
            setError({ ...error, password: true });
        } else {
            setError({ ...error, password: false });
        }

        setUser({ ...user, password: e.target.value });
    };

    const handleClickConfirmPassword = (e) => {
        if (e.target.value === user.password) {
            setError({ ...error, confirmPassword: true });
        } else {
            setError({ ...error, confirmPassword: false });
        }

        setUser({ ...user, confirmPassword: e.target.value });
    };

    const checkIsLoginFormValid = () => {
        (
            (error.email && user.email !== '') &&
            (error.password && user.password !== '')
        ) ? setIsLoginFormValid(true) : setIsLoginFormValid(false);
    }

    const checkIsRegFormValid = () => {
        (
            (error.email && user.email !== '') &&
            (error.companyName && user.companyName !== '') &&
            (error.password && user.password !== '') &&
            (error.confirmPassword && user.confirmPassword !== '')
        ) ? setIsRegFormValid(true) : setIsRegFormValid(false);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return {
        error,
        user,
        isLoginFormValid,
        isRegFormValid,
        onLoginSubmit,
        onRegisterSubmit,
        handleClickEmail,
        handleClickCompanyName,
        handleClickPassword,
        handleClickConfirmPassword,
        checkIsLoginFormValid,
        checkIsRegFormValid,
        showPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword
    };
};