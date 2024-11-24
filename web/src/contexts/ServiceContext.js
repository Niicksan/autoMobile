import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { vehicleServiceFactory } from '../services/vehicleService';
import { useVehicleContext } from './VehicleContext';


export const ServiceContext = createContext();

export const ServiceProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const vehicleService = vehicleServiceFactory();
    const { vehicle, setVehicle } = useVehicleContext();
    const [error, setError] = useState({
        title: true,
        kilometers: true,
        description: true
    });

    const getServiceById = async (vehicleId, serviceId) => {
        try {
            const service = await vehicleService.getServiceById(vehicleId, serviceId);

            return service;

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

    const onCreateServiceSubmit = async (data, vehicleId) => {
        try {
            const newService = await vehicleService.createService(data, vehicleId);

            if (newService.message) {
                throw new Error(newService.message);
            }

            setVehicle({ ...vehicle, doneServices: [newService, ...vehicle.doneServices] });
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }
    };

    const onEditServiceSubmit = async (data, vehicleId, serviceId) => {
        try {
            const service = await vehicleService.editService(data, vehicleId, serviceId);

            setVehicle({ ...vehicle, doneServices: [...vehicle.doneServices.map(s => s._id === serviceId ? service : s)] });
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }

        setTimeout(() => {
            setError({ ...error, isVinNumberExist: '' });
        }, 5000);
    };

    const onDeleteServiceSubmit = async (vehicleId, serviceId) => {
        try {
            await vehicleService.deleteService(vehicleId, serviceId);

            setVehicle({ ...vehicle, doneServices: [...vehicle.doneServices.filter(service => service._id !== serviceId)] });
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                console.log(err);
                navigate('/403');
            }
        }
    };

    const contextValues = {
        error,
        setError,
        getServiceById,
        onCreateServiceSubmit,
        onEditServiceSubmit,
        onDeleteServiceSubmit
    };

    return (
        <ServiceContext.Provider value={contextValues}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServiceContext = () => {
    const context = useContext(ServiceContext);

    return context;
};