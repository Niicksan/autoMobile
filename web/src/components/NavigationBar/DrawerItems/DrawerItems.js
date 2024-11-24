import { Link } from 'react-router-dom';

import { Box, Button, Typography, Divider, List } from '@mui/material';

import { MobileNavItems } from "../MobileNavItems/MobileNavItems";

export const DrawerItems = ({ handleDrawerToggle }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Button onClick={handleDrawerToggle} variant="text" sx={{ position: 'absolute', top: '14px', left: '0px', color: 'black' }}>X</Button>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" sx={{ my: 2, width: '100%', alignContent: 'center', alignItems: 'center' }}>
                    <Link onClick={handleDrawerToggle} to="/" style={{ color: 'black', textDecoration: 'none' }}>
                        AutoMobile
                    </Link>
                </Typography>
            </Box>
            <Divider />
            <List>
                <MobileNavItems handleDrawerToggle={handleDrawerToggle} />
            </List>
        </Box>
    );
};