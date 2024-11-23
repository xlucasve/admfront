/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import useEditCaseActions from '../../../../hooks/case/useEditCaseActions';
import { useNavigate } from 'react-router-dom';


export const OperatorAcceptModal = ({ open, onClose, claim, username, onSave }) => {
    const navigate = useNavigate();
    const { isLoading, handleEditCase } = useEditCaseActions({
        claimId: claim._id,
    });

    if (!claim) return null;

    const handleAccept = async () => {

        const newClaim = {
            ...claim,
            assignedOperator: username,
        }

        const response = await handleEditCase({ newClaim, hasChanged: true });
        if (response.hasError) return;

        navigate(`/my-${claim.caseType === 'Mediacion' ? 'arbitrations' : 'claims'}`);

        onSave(newClaim);
        onClose();
    }

    return (
        <Dialog open={open} onClose={!isLoading ? onClose : null} maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                ¿Quieres gestionar este reclamo?
            </DialogTitle>

            <DialogContent>
                <Typography marginBottom={2}>
                    <strong>Prioridad:</strong> {claim.priority}
                </Typography>

                {claim.category !== 'Mediaciones' && <Typography>
                    <strong>Categoría:</strong> {claim.category}
                </Typography>}

                <Typography marginBottom={2}>
                    <strong>Asunto:</strong> {claim.subject}
                </Typography>

                <Typography>
                    <strong>Descripción:</strong> {claim.description}
                </Typography>

                <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
                    <Button onClick={onClose} variant="contained" color="secondary" disabled={isLoading}>
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleAccept}
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="primary" /> : null}
                    >
                        {isLoading ? "Asignando..." : "Aceptar"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

