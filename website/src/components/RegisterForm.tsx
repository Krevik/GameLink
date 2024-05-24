import React from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../utils/notificationUtils';
import axiosInstance from "../api/axiosConfig.ts";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const username = data.get('username') as string;

        try {
            await axiosInstance.post('/auth/register', { email, password, username });
            notifySuccess('Registered successfully');
            navigate('/login'); // Przekierowanie do strony logowania
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach((err: any) => notifyError(err.msg));
            } else {
                notifyError(error.response.data.message || 'Failed to register');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '1rem' }}>
                            Register
                        </Button>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Typography>
                            Masz już konto? <Link component={RouterLink} to="/login">Zaloguj się</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterForm;
