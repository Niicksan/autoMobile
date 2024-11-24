import { apiUrl } from '../env'

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/vehicle`;

export const vehicleServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        getAllVehicles: () => request.get(`${baseUrl}`),
        getVehicleById: (vehicleId) => request.get(`${baseUrl}/${vehicleId}`),
        createVehicle: (vehicleData) => request.post(`${baseUrl}`, vehicleData, true),
        editVehicle: (vehicleData, vehicleId) => request.patch(`${baseUrl}/${vehicleId}`, vehicleData, true),
        deleteVehicle: (vehicleId) => request.delete(`${baseUrl}/${vehicleId}`),
    }
}