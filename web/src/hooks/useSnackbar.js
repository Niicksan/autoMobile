import { useState } from 'react';

export const useSnackbar = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const handleClickOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleClickCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const onSetMessage = (input) => {
        setMessage(input);
    };

    const isSnackbarOpen = () => {
        return openSnackbar ? true : false;
    }

    return {
        openSnackbar,
        setOpenSnackbar,
        message,
        onSetMessage,
        isSnackbarOpen,
        handleClickOpenSnackbar,
        handleClickCloseSnackbar,
    };
};