import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from './AuthContext';
import { vehicleServiceFactory } from '../services/vehicleService';
import { createFormatData } from '../utils/createFormatData';

export const VehicleContext = createContext();

export const VehicleProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    const { userId, isAuthenticated } = useAuthContext();
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState({});
    const vehicleService = vehicleServiceFactory();
    const [error, setError] = useState({
        vinNumber: true,
        make: true,
        model: true,
        engine: true,
        fuel: true,
        yearOfManufacture: true,
        imageFile: true,
        isVinNumberExist: '',
    });

    useEffect(() => {
        if (isAuthenticated) {
            vehicleService.getAllVehicles(userId)
                .then(result => {
                    setVehicles(result);
                });
        }
    }, [isAuthenticated, userId]);

    useEffect(() => {
        setError({
            vinNumber: true,
            make: true,
            model: true,
            engine: true,
            fuel: true,
            yearOfManufacture: true,
            imageFile: true,
            isVinNumberExist: '',
        });
    }, [pathname]);

    const getVehicleById = async (vehicleId) => {
        try {
            const vehicle = await vehicleService.getVehicleById(vehicleId);

            return vehicle;

        } catch (err) {
            if (err.messageEn === "Item doesn't exist") {
                console.log(err);
                navigate('/404');
            } else if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }
    };

    const getVehicleByIdWithServices = async (vehicleId) => {
        try {
            const vehicle = await vehicleService.getVehicleByIdWithServices(vehicleId);

            return vehicle;

        } catch (err) {
            if (err.messageEn === "Item doesn't exist") {
                console.log(err);
                navigate('/404');
            } else if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }
    };

    const onCreateVehicleSubmit = async (data) => {
        try {
            const formData = createFormatData(data);
            const newVehicle = await vehicleService.createVehicle(formData);

            if (newVehicle.message) {
                setError({ ...error, isVinNumberExist: newVehicle.message });
            }

            setVehicles(state => [newVehicle, ...state]);
            navigate('/catalog/vehicles');
        } catch (err) {
            setError({ ...error, isVinNumberExist: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }

        setTimeout(() => {
            setError({ ...error, isVinNumberExist: '' });
        }, 5000);
    };

    const onEditVehicleSubmit = async (data, vehicleId) => {
        try {
            const formData = createFormatData(data);
            const vehicle = await vehicleService.editVehicle(formData, vehicleId);

            if (vehicle.message) {
                setError({ ...error, isVinNumberExist: vehicle.message });
            }

            setVehicles(state => state.map(v => v._id === vehicleId ? vehicle : v))
            navigate('/catalog/vehicles');
        } catch (err) {
            setError({ ...error, isVinNumberExist: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }

        setTimeout(() => {
            setError({ ...error, isVinNumberExist: '' });
        }, 5000);
    };

    const onDeleteVehicleSubmit = async (vehicleId) => {
        try {
            await vehicleService.deleteVehicle(vehicleId);
            setVehicles(state => state.filter(vehicle => vehicle._id !== vehicleId));
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }
    };

    const contextValues = {
        vehicles,
        vehicle,
        setVehicle,
        error,
        setError,
        getVehicleById,
        getVehicleByIdWithServices,
        onCreateVehicleSubmit,
        onEditVehicleSubmit,
        onDeleteVehicleSubmit,
    };

    return (
        <VehicleContext.Provider value={contextValues}>
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicleContext = () => {
    const context = useContext(VehicleContext);

    return context;
};