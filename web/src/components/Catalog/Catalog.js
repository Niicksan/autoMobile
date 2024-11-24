import './Catalog.scss';

import { Link } from 'react-router-dom';

import { Box } from '@mui/system';

import { useVehicleContext } from "../../contexts/VehicleContext";

import { VehicleItem } from './VehicleItem/VehicleItem';

export const Catalog = () => {
    const { vehicles } = useVehicleContext();

    return (
        <section style={{ minHeight: '60vh' }} id="catalog-page">
            <h1 style={{ color: '#00308F' }}>Vehicles catalog</h1>

            {vehicles.length > 0 && (<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {vehicles.length !== 0 && (vehicles.map(x =>
                    <VehicleItem key={x._id} {...x} />
                ))}
            </Box>)}
            {vehicles.length === 0 && (
                <>
                    <h3 className="no-articles">No vehicles added yet</h3>
                    <Link to="/vehicle/create" className="add">
                        Add vehicle
                    </Link>
                </>
            )}
        </section>
    );
};