import { Link } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { useAuthContext } from '../../../contexts/AuthContext';

export const MobileNavItems = ({ handleDrawerToggle }) => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            {isAuthenticated && (
                <>
                    <ListItem onClick={handleDrawerToggle} component={Link} to="/catalog/vehicles" key={'catalog'} disablePadding>
                        <ListItemButton sx={{
                            textAlign: 'left', color: '#00308F', paddingLeft: "90px", ":hover": {
                                border: "1px solid #00308F"
                            }
                        }}>
                            <ListItemText primary={'Catalog'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem onClick={handleDrawerToggle} component={Link} to="/vehicle/create" key={'vehicle-craete'} disablePadding>
                        <ListItemButton sx={{
                            textAlign: 'left', color: '#00308F', paddingLeft: "90px", ":hover": {
                                border: "1px solid #00308F"
                            }
                        }}>
                            <ListItemText primary={'Add'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem onClick={handleDrawerToggle} component={Link} to="/user/my-profile" key={'my-profile'} disablePadding>
                        <ListItemButton sx={{
                            textAlign: 'left', color: '#00308F', paddingLeft: "90px", ":hover": {
                                border: "1px solid #00308F"
                            }
                        }}>
                            <ListItemText primary={'My profile'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem onClick={handleDrawerToggle} component={Link} to="/auth/logout" key={'logot'} disablePadding>
                        <ListItemButton sx={{
                            textAlign: 'left', color: '#00308F', paddingLeft: "90px", ":hover": {
                                border: "1px solid #00308F"
                            }
                        }}>
                            <ListItemText primary={'Logout'} />
                        </ListItemButton>
                    </ListItem>
                </>
            )}

            {!isAuthenticated && (
                <>
                    <ListItem onClick={handleDrawerToggle} component={Link} to="/auth/login" key={'login'} disablePadding>
                        <ListItemButton sx={{
                            textAlign: 'left', color: '#00308F', paddingLeft: "90px", ":hover": {
                                border: "1px solid #00308F"
                            }
                        }}>
                            <ListItemText primary={'Login'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem onClick={handleDrawerToggle} component={Link} to="/auth/register" key={'register'} disablePadding>
                        <ListItemButton sx={{
                            textAlign: 'left', color: '#00308F', paddingLeft: "90px", ":hover": {
                                border: "1px solid #00308F"
                            }
                        }}>
                            <ListItemText primary={'Register'} />
                        </ListItemButton>
                    </ListItem>
                </>
            )
            }
        </>
    );
};