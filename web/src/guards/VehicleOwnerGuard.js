import { useEffect, useState } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';

import { useAuthContext } from "../contexts/AuthContext";
import { useVehicleContext } from '../contexts/VehicleContext';


export const VehicleOwnerGuard = ({ children }) => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const { getVehicleById } = useVehicleContext();
    const { userId } = useAuthContext();

    useEffect(() => {
        getVehicleById(id)
            .then(result => {
                setVehicle(result);
            })
    }, [id]);

    if (vehicle && vehicle._ownerId !== userId) {
        return <Navigate to={`/403`} replace />
    }

    return children ? children : <Outlet />
};