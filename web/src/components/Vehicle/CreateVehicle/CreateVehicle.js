import './CreateVehicle.scss';

import { useEffect } from 'react';

import { Container, Avatar, Button, CssBaseline, TextField, Box, Typography, MenuItem, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { FileUpload } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from '../../../hooks/useForm';
import { useVehicleValidation } from '../../../hooks/useVehicleValidation';

const theme = createTheme();

export const CreateVehicle = () => {
    const {
        fuels,
        years,
        form,
        error,
        isVehicleFormValid,
        handleClickVinNumber,
        handleClickMake,
        handleClickModel,
        handleClickEngine,
        handleClickFuel,
        handleClickYearOfManufacture,
        handleClickImageFile,
        onCreateVehicleSubmit,
        checkIsVehicleFormValid
    } = useVehicleValidation();

    const { values, changeHandler, changeHandlerImageFile, onSubmit } = useForm({
        vinNumber: '',
        make: '',
        model: '',
        engine: '',
        fuel: '',
        yearOfManufacture: '',
        imageFile: ''
    }, onCreateVehicleSubmit);

    useEffect(() => {
        checkIsVehicleFormValid();
    }, [form.vinNumber, form.make, form.model, form.engine, form.fuel, form.yearOfManufacture, form.imageFile]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'green' }} >
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Add Vehicle
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: '100%' }}>
                        <TextField
                            error={!error.vinNumber}
                            margin="normal"
                            required
                            fullWidth
                            id="vinNumber"
                            label="VIN Number"
                            name="vinNumber"
                            autoComplete="vinNumber"
                            value={values.vinNumber}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickVinNumber(e);
                            }}
                        />
                        {!error.vinNumber && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>VIN Number must be exactly 17 characters</Typography>}
                        {error.isVinNumberExist && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{error.isVinNumberExist}</Typography>}

                        <TextField
                            error={!error.make}
                            margin="normal"
                            required
                            fullWidth
                            id="make"
                            label="Make"
                            name="make"
                            autoComplete="make"
                            value={values.make}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickMake(e);
                            }}
                        />
                        {!error.make && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Make must be at least 2 characters long</Typography>}

                        <TextField
                            error={!error.model}
                            margin="normal"
                            required
                            fullWidth
                            id="model"
                            label="Model"
                            name="model"
                            autoComplete="model"
                            value={values.model}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickModel(e);
                            }}
                        />
                        {!error.model && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Model must be at least 2 characters long</Typography>}

                        <TextField
                            error={!error.engine}
                            margin="normal"
                            required
                            fullWidth
                            id="engine"
                            label="Engine"
                            name="engine"
                            autoComplete="engine"
                            value={values.engine}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickEngine(e);
                            }}
                        />
                        {!error.engine && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Engine must be at least 2 characters long</Typography>}
                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                error={!error.fuel}
                                margin="normal"
                                required
                                id="fuel"
                                select={true}
                                label="Fuel"
                                name="fuel"
                                autoComplete="fuel"
                                value={values.fuel}
                                sx={{ width: "48%", textAlign: 'left' }}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickFuel(e);
                                }}
                            >
                                {fuels.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {!error.fuel && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Select a fuel</Typography>}

                            <TextField
                                error={!error.yearOfManufacture}
                                margin="normal"
                                required
                                id="yearOfManufacture"
                                select={true}
                                label="Year"
                                name="yearOfManufacture"
                                autoComplete="yearOfManufacture"
                                value={values.yearOfManufacture}
                                sx={{ width: "48%", textAlign: 'left' }}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickYearOfManufacture(e);
                                }}
                            >
                                {years.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {!error.yearOfManufacture && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Select an year</Typography>}
                        </Box>

                        <TextField
                            error={!error.imageFile}
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            label="image"
                            name="image"
                            value={values.imageFile?.name || ''}
                            InputProps={{
                                endAdornment: (
                                    <IconButton component="label">
                                        <FileUpload />
                                        <input
                                            styles={{ display: "none" }}
                                            type="file"
                                            accept="image/png, image/jpg, image/jpeg"
                                            hidden
                                            onChange={(e) => {
                                                changeHandlerImageFile(e);
                                                handleClickImageFile(e);
                                            }}
                                            name="[licenseFile]"
                                        />
                                    </IconButton>
                                ),
                            }}
                        />
                        {!error.imageFile && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Select an image</Typography>}

                        <Button
                            disabled={!isVehicleFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#00308F' }}
                        >
                            Add Vehicle
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};