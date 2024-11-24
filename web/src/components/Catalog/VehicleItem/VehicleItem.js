import '../VehicleItem/VehicleItem.scss';

import { imageUrl } from '../../../env';
import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useVehicleContext } from '../../../contexts/VehicleContext';
import { DeleteModal } from '../DeleteModal/DeleteModal';

import { useModal } from '../../../hooks/useModal';

export const VehicleItem = ({
    _id,
    vinNumber,
    make,
    model,
    engine,
    fuel,
    yearOfManufacture,
    imagePath,
    createdAtFormatted,
    isDetails
}) => {
    const {
        openDeleteModal,
        handleClickOpenDeleteModal,
        handleClickCloseDeleteModal
    } = useModal();

    const { onDeleteVehicleSubmit } = useVehicleContext();

    const vehicleTitle = `${make} ${model} ${engine}`;
    const message = 'Сигурни ли сте, че искате да изтриете този автомобил?';

    return (
        <>
            {openDeleteModal && (<DeleteModal
                open={openDeleteModal}
                title={vehicleTitle}
                message={message}
                handleClose={handleClickCloseDeleteModal}
                onDeleteSubmit={onDeleteVehicleSubmit}
                vehicleId={_id}
            />)}

            <Card className='card' sx={{ m: 2, width: '80%', maxWidth: '1920px' }}>
                <CardMedia component='img' to={`/catalog/vehicles/${_id}`}
                    sx={{ minWidth: '30%', maxWidth: '40%', flex: 1, objectFit: 'cover' }}
                    className='image'
                    image={imagePath ? `${imageUrl}${imagePath}` : ''}
                    title={vehicleTitle}
                />
                <Box className='card-content-holder'>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {vehicleTitle}
                        </Typography>

                        <Box variant="body2" className='content-items-holder' >
                            <Box className='content-items-left' >
                                <Typography color="text.secondary" >
                                    <Typography component='span' className='content-item' >VIN Number: </Typography>{vinNumber}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Make: </Typography>{make}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Model: </Typography>{model}
                                </Typography>
                            </Box>

                            <Box className='content-items-left' >
                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Engine: </Typography>{engine}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Fuel: </Typography>{fuel}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Year: </Typography>{yearOfManufacture}
                                </Typography>
                            </Box>

                        </Box>
                        {isDetails && (
                            <Box sx={{ textAlign: 'left', marginTop: '1em' }}>
                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item'>Created at: </Typography>{createdAtFormatted}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                    <CardActions className='action' sx={{ m: 1, justifyContent: 'flex-end' }}>
                        {!isDetails && (
                            <>
                                <Button component={Link} to={`/catalog/vehicles/${_id}`} variant="outlined" size="small" >Details</Button>
                                <Button component={Link} to={`/catalog/vehicles/edit/${_id}`} size="small" variant="outlined" sx={{ marginRight: '10px' }} startIcon={<EditIcon />} >Edit</Button>
                                <Button size="small" variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleClickOpenDeleteModal}>Delete</Button>
                            </>
                        )}

                        {isDetails && (
                            <>
                                <Button component={Link} to={'/catalog/vehicles'} size="small" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ marginRight: '10px' }}>Back</Button>
                            </>
                        )}
                    </CardActions>
                </Box>
            </Card >
        </>
    );
};