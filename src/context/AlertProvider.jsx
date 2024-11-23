import React, { createContext, useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    const showAlert = (message, severity = 'success') => {
        setAlert({ open: true, message, severity });
    };

    const handleClose = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
