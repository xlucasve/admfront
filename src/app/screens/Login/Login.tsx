import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    LinearProgress
} from '@mui/material';
import useLoginActions from '../../../hooks/auth/useLoginActions';

const Login = () => {

    const {
        isLoadingLogin,
        callApiLogin,
    } = useLoginActions()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setEmailError('');

        setPasswordError('');

        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError('Por favor, ingrese un email válido');
            isValid = false;
        }

        if (password.length < 4) {
            setPasswordError('La contraseña debe tener al menos 4 caracteres');
            isValid = false;
        }

        if (isValid) {
            callApiLogin({ email, password })
        }
    };

    if(isLoadingLogin){
        return(
            <LinearProgress/>
        )
    }

    return (
        <Container component="main" maxWidth="sm">

            <Paper elevation={3} sx={{ mt: 8, mb: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography component="h1" variant="h5" fontWeight="bold">
                    Administración Interna
                </Typography>
                <Typography variant="h6">
                    Iniciá Sesión
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        type='email'
                        autoFocus
                        value={email}
                        onChange={(e) => {
                            setEmailError('')
                            setEmail(e.target.value)
                        }}
                        error={!!emailError}
                        helperText={emailError}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPasswordError('')
                            setPassword(e.target.value)
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='success'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        <Typography fontWeight="bold">
                            Iniciar Sesión
                        </Typography>
                    </Button>

                </Box>

            </Paper>

        </Container>
    );
}
export default Login