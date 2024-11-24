import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteModal = ({
    open,
    title,
    message,
    handleClose,
    onDeleteSubmit,
    vehicleId,
    serviceId
}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} autoFocus onClick={handleClose}>
                        Назад
                    </Button>
                    {!serviceId && (
                        <Button variant="contained" color={'error'} startIcon={<DeleteIcon />}
                            onClick={() => {
                                onDeleteSubmit(vehicleId);
                                handleClose();
                            }}>
                            Да
                        </Button>)}
                    {serviceId && (
                        <Button variant="contained" color={'error'} startIcon={<DeleteIcon />}
                            onClick={() => {
                                onDeleteSubmit(vehicleId, serviceId);
                                handleClose();
                            }}>
                            Да
                        </Button>)}
                </DialogActions>
            </Dialog>
        </div>
    );
};