import './App.css';

import { Routes, Route, useLocation } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';
import { VehicleProvider } from './contexts/VehicleContext';

import { AuthGuard } from './guards/AuthGuard';
// import { VehicleOwnerGuard } from './guards/VehicleOwnerGuard';
import { HasUserGuard } from './guards/HasUserGuard';

import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { VehicleDetails } from './components/Catalog/VehicleDetails/VehicleDetails';
import { EditVehicle } from './components/Vehicle/EditVehicle/EditVehicle';
import { CreateVehicle } from './components/Vehicle/CreateVehicle/CreateVehicle';
import { MyProfile } from './components/MyProfile/MyProfile';
import { Logout } from './components/Logout/Logout';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Forbidden } from './components/Error/Forbidden/Forbidden';
import { NotFound } from './components/Error/NotFound/NotFound';
import { Footer } from './components/Footer/Footer';
import { seTabTitle } from './utils/setTabTitle';

function App() {
    const { pathname } = useLocation();

    seTabTitle(pathname);

    return (
        <AuthProvider >
            <VehicleProvider >
                <div className="app">
                    <NavigationBar />
                    <Box component="main" className="main">
                        <Toolbar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route element={<AuthGuard />}>
                                <Route path='/catalog/vehicles' element={<Catalog />} />
                                {/* <Route element={<VehicleOwnerGuard />}> */}
                                <Route path='/catalog/vehicles/:id' element={<VehicleDetails />} />
                                <Route path='/catalog/vehicles/edit/:id' element={<EditVehicle />} />
                                {/* </Route> */}
                                <Route path='/vehicle/create' element={<CreateVehicle />} />
                                <Route path='/user/my-profile' element={<MyProfile />} />
                                <Route path='/auth/logout' element={<Logout />} />
                            </Route>
                            <Route element={<HasUserGuard />}>
                                <Route path='/auth/login' element={<Login />} />
                                <Route path='/auth/register' element={<Register />} />
                            </Route>
                            <Route path="/403" element={<Forbidden />} />
                            <Route path="/404" element={<NotFound />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Toolbar />
                    </Box>
                    <Footer />
                </div>
            </VehicleProvider >
        </AuthProvider >
    );
}

export default App;