import React, { useState } from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
    Box,
    Chip,
    Divider,
    Container,
    Card,
    CardContent,
    CardHeader,
    LinearProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    CalendarToday,
    Email,
    Phone,
    LocationOn,
    Lock,
    FormatAlignJustify
} from '@mui/icons-material';

import { usePutUserActions } from '../../../hooks/user/usePutUserActions';

import './Profile.scss'

import { useAlert } from '../../../context/AlertProvider';
import { useAuth } from '../../../context/AuthProvider';


const Profile = () => {

    const { auth, logoutUser } = useAuth()
    const {
        handleCallApi,
        isLoading,
    } = usePutUserActions({ userId: auth._id })
    const { showAlert } = useAlert();
    const [contactInfo, setContactInfo] = useState({
        email: auth.email,
        phone: auth.phone,
        address: auth.address,
        location: auth.location
    });
    const [inputErrors, setInputErrors] = useState({
        email: false,
        phone: false,
        address: false,
        location: false,
    });
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleContactChange = (e) => {
        setInputErrors({
            ...inputErrors,
            [e.target.name]: false
        })
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setInputErrors({
            ...inputErrors,
            [e.target.name]: false
        })
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmitContact = async (e) => {
        e.preventDefault();

        if (!esEmailValido(contactInfo.email)) {
            setInputErrors({
                ...inputErrors,
                email: true
            })
            showAlert('Complete de forma correcta el email', 'error');
            return null
        }
        if (!esTelefonoArgentinoValido(contactInfo.phone)) {
            setInputErrors({
                ...inputErrors,
                phone: true
            })
            showAlert('Complete de forma correcta el teléfono', 'error');
            return null
        }
        if (contactInfo.address.trim().length < 4) {
            setInputErrors({
                ...inputErrors,
                address: true
            })
            showAlert('Complete de forma correcta la dirección', 'error');
            return null
        }
        if (contactInfo.location.trim().length < 4) {
            setInputErrors({
                ...inputErrors,
                location: true
            })
            showAlert('Complete de forma correcta la localidad', 'error');
            return null
        }

        const response = await handleCallApi({
            phone: contactInfo.phone,
            address: contactInfo.address,
            location: contactInfo.location,
        }, true)

        if(response.hasError){
            showAlert('Ocurrió un error, por favor intente más tarde', 'error');
        }else{
            showAlert('Información de contacto modificada', 'success');
        }

        setIsEditing(false);

    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        if (password.new !== password.confirm) {
            showAlert('La nueva contraseña y la de confirmación tienen que coincidir', 'error');
            return null
        }
        if (password.new.length < 6) {
            showAlert('La nueva contraseña debe ser de 6 dígitos o más', 'error');
            return null
        }

        if (password.current!==auth.password) {
            showAlert('La contraseña actual ingresada no es válida', 'error');
            return null
        }

        const response = await handleCallApi({
            password: password.new,
        }, true)

        if(response.hasError){
            showAlert('Ocurrió un error, por favor intente más tarde', 'error');
        }else{
            showAlert('Contraseña modificada', 'success');
        }

        setIsChangingPassword(false);
        setPassword({ current: '', new: '', confirm: '' });
    };

    function esEmailValido(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
    function esTelefonoArgentinoValido(telefono) {
        const regexTelefono = /^(?:(?:\+?54\s?)?9?\s?(?:\d{2,4})\s?)?(\d{4})[\s-]?(\d{4})$/;
        return regexTelefono.test(telefono);
    }

    if (isLoading) {
        return <LinearProgress />
    }

    return (
        <Container>
            <Box sx={{
                my: 4,
                "& .MuiPaper-root": {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
            }}
            >
                <Typography variant="h4" component="h1" gutterBottom id='perfil-titulo'>
                    Perfil de Usuario
                </Typography>

                <Card sx={{ mb: 4 }} variant='outlined'>
                    <CardHeader title="Información General" id='perfil-informacion-general' />
                    <CardContent>
                        <div className='data-grid'>
                            <Grid xs={12} sm={6}>
                                <Typography variant="subtitle2">Nombre Completo</Typography>
                                <Typography variant="body1" id="perfil-nombre">{auth.fullName}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Typography variant="subtitle2">ID del Empleado</Typography>
                                <Typography variant="body1" id="perfil-id">{auth.employeeId}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Box display="flex" aligns="center" gap={1}>
                                    <CalendarToday fontSize="small" />
                                    <Typography variant="subtitle2">Fecha de Nacimiento</Typography>
                                </Box>
                                <Typography variant="body1" id="perfil-fecha-nacimiento">{auth.birthDate}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Box display="flex" aligns="center" gap={1}>
                                    <CalendarToday fontSize="small" />
                                    <Typography variant="subtitle2">Fecha de Ingreso</Typography>
                                </Box>
                                <Typography variant="body1" id="perfil-fecha-ingreso">{auth.entryDate}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Typography variant="subtitle2">Puesto</Typography>
                                <Typography variant="body1" id="perfil-position">{auth.position}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Typography variant="subtitle2">Departamento</Typography>
                                <Typography variant="body1" id="perfil-department">{auth.department}</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="subtitle2">Rol de Acceso</Typography>
                                <Chip label={auth.accessRole} color="primary" variant="outlined" id="perfil-rol" />
                            </Grid>
                        </div>
                    </CardContent>
                </Card>

                <Card sx={{ mb: 4 }} variant='outlined'>
                    <CardHeader title="Información de Contacto" id="perfil-contacto" />
                    <CardContent>
                        {isEditing ? (
                            <form onSubmit={handleSubmitContact}>
                                <div className='data-column'>
                                    <Grid xs={12}>
                                        <Box display="flex" aligns="center" gap={1}>
                                            <Email fontSize="small" />
                                            <Typography id="perfil-email">{contactInfo.email}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Teléfono"
                                            name="phone"
                                            type='number'
                                            value={Number(contactInfo.phone)}
                                            onChange={handleContactChange}
                                            required
                                            id="perfil-edit-phone"
                                            error={inputErrors.phone}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Dirección"
                                            name="address"
                                            value={contactInfo.address}
                                            onChange={handleContactChange}
                                            required
                                            id="perfil-edit-address"
                                            error={inputErrors.address}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Localidad"
                                            name="location"
                                            value={contactInfo.location}
                                            onChange={handleContactChange}
                                            required
                                            id="perfil-edit-location"
                                            error={inputErrors.location}
                                        />
                                    </Grid>
                                </div>
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary" id="perfil-guardar-cambios-contacto">
                                        Guardar Cambios
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)} sx={{ ml: 2 }} id="perfil-cancelar-cambios-contacto">
                                        Cancelar
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <div className='data-column'>
                                <Grid xs={12}>
                                    <Box display="flex" aligns="center" gap={1}>
                                        <Email fontSize="small" />
                                        <Typography id="perfil-email">{contactInfo.email}</Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={12}>
                                    <Box display="flex" aligns="center" gap={1}>
                                        <Phone fontSize="small" />
                                        <Typography id="perfil-phone">{contactInfo.phone}</Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={12}>
                                    <Box display="flex" aligns="center" gap={1}>
                                        <LocationOn fontSize="small" />
                                        <Typography id="perfil-address">{contactInfo.address}</Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={12}>
                                    <Box display="flex" aligns="center" gap={1}>
                                        <LocationOn fontSize="small" />
                                        <Typography id="perfil-location">{contactInfo.location}</Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={12}>
                                    <Button variant="outlined" onClick={() => setIsEditing(true)} id="perfil-editar-contacto">
                                        Editar Información de Contacto
                                    </Button>
                                </Grid>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card variant='outlined'>
                    <CardHeader title="Cambiar Contraseña" id="perfil-contrasena" />
                    <CardContent>
                        {isChangingPassword ? (
                            <form onSubmit={handleSubmitPassword}>
                                <div className='data-column'>
                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Contraseña Actual"
                                            name="current"
                                            type="password"
                                            value={password.current}
                                            onChange={handlePasswordChange}
                                            required
                                            id="perfil-editar-contrasena-actual"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Nueva Contraseña"
                                            name="new"
                                            type="password"
                                            value={password.new}
                                            onChange={handlePasswordChange}
                                            required
                                            id="perfil-editar-contrasena-nueva"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Confirmar Nueva Contraseña"
                                            name="confirm"
                                            type="password"
                                            value={password.confirm}
                                            onChange={handlePasswordChange}
                                            required
                                            id="perfil-editar-contrasena-confirmar"
                                        />
                                    </Grid>
                                </div>
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary" id="perfil-cambiar-contrasena-accion">
                                        Cambiar Contraseña
                                    </Button>
                                    <Button onClick={() => setIsChangingPassword(false)} sx={{ ml: 2 }} id="perfil-cancelar-contraseña">
                                        Cancelar
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Button
                                variant="outlined"
                                startIcon={<Lock />}
                                onClick={() => setIsChangingPassword(true)}
                                id="perfil-cambiar-contrasena-editar"
                            >
                                Cambiar Contraseña
                            </Button>
                        )}
                    </CardContent>
                </Card>

                <div
                    style={{ display: 'flex', flexDirection: 'center', aligns: 'center', justifyContent: 'center', marginTop: 24 }}
                >
                    <Button
                        color='error'
                        variant='contained'
                        onClick={() => {
                            logoutUser()
                        }}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </Box>
        </Container >
    );
}

export default Profile