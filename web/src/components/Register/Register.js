import { useEffect } from "react";
import { Link } from 'react-router-dom';

import { Container, Avatar, Button, CssBaseline, TextField, Box, Grid, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "../../hooks/useForm";
import { useAuthValidation } from "../../hooks/useAuthValidation";

const theme = createTheme();

export const Register = () => {
    const {
        error,
        user,
        isRegFormValid,
        onRegisterSubmit,
        handleClickEmail,
        handleClickCompanyName,
        handleClickPassword,
        handleClickConfirmPassword,
        checkIsRegFormValid,
        showPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword
    } = useAuthValidation();

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        companyName: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    useEffect(() => {
        checkIsRegFormValid()
    }, [user.email, user.companyName, user.password, user.confirmPassword]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration in AutoSoft
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={!error.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickEmail(e);
                            }}
                        />
                        {!error.email && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Invalid Email</Typography>}
                        {error.isUserExist && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{error.isUserExist}</Typography>}

                        <TextField
                            error={!error.companyName}
                            margin="normal"
                            required
                            fullWidth
                            id="company-name"
                            label="Comapny name"
                            name="companyName"
                            autoComplete="companyName"
                            value={values.companyName}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickCompanyName(e);
                            }}
                        />
                        {!error.companyName && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Name should be at least 2 characters long</Typography>}
                        <FormControl fullWidth required sx={{ margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                error={!error.password}
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickPassword(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {!error.password && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Password should be at least 5 characters long</Typography>}
                        <FormControl required fullWidth sx={{ margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Repeat your password</InputLabel>
                            <OutlinedInput
                                error={!error.confirmPassword}
                                id="confirmPassword"
                                label="Repeat your password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickConfirmPassword(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {!error.confirmPassword && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Passwords don't match</Typography>}

                        <Button
                            disabled={!isRegFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#00308F' }}
                        >
                            Register
                        </Button>
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ marginRight: '5px' }}>
                                    Have an account?
                                </Typography>
                                <Typography component={Link} to="/auth/login" sx={{ color: '#00308F', textDecoration: 'none', cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>
                                    {"Login"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};