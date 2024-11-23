import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, CircularProgress, Typography, Box } from '@mui/material';
import { useDeleteUserActions } from '../../../../hooks/user/useDeleteUserActions';

export const DeleteUserModal = ({ open, onClose, onSave, user }) => {

    const { handleDeleteUser, isLoading } = useDeleteUserActions({ userId: user._id });

    const [isDeletingLoading, setIsDeletingLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setIsDeletingLoading(true);
            const timer = setTimeout(() => {
                setIsDeletingLoading(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [open]);


    const handleClickOnDelete = async () => {

        await handleDeleteUser();

        onSave(user._id);

        onClose();
    }

    return (
        <Dialog open={open} onClose={!isLoading ? onClose : null} maxWidth="sm">
            <DialogTitle fontWeight={'bold'} >¿Estas seguro de eliminar a {user.fullName}?</DialogTitle>
            <DialogContent>
                <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={onClose}>
                        Cancelar</Button>
                    <Button
                        onClick={handleClickOnDelete}
                        variant='contained'
                        color="error"
                        disabled={isDeletingLoading}
                    >
                        {!isDeletingLoading && !isLoading ? 'Eliminar' : <CircularProgress size={22} color="primary" />}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
