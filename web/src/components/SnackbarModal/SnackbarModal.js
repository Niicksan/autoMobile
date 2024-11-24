import { forwardRef, useEffect } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';

import { useSnackbar } from '../../hooks/useSnackbar';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarModal = () => {
    const {
        openSnackbar,
        message,
        handleClickOpenSnackbar,
        handleClickCloseSnackbar
    } = useSnackbar();

    useEffect(
        () => {
            handleClickOpenSnackbar();
        },
        [message]
    );

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpenSnackbar}>
                Open success snackbar
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClickCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClickCloseSnackbar} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}