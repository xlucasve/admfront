import React from 'react';
import { Button, Box, Typography } from '@mui/material';

export const NotFound = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="90vh"
            textAlign="center"
            p={3}
        >
            <Typography variant="h4" gutterBottom>
                404 - Página no encontrada
            </Typography>
            <Button sx={{ marginTop: 2 }} variant="contained" color="primary" onClick={handleGoBack}>
                Regresar
            </Button>
        </Box>
    );
};
