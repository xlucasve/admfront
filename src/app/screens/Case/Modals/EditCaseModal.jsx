import React, { useState } from 'react';
import { Box, Button, TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, Typography, CircularProgress, DialogActions } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import moment from 'moment';
import { orange } from '@mui/material/colors';
import useEditCaseActions from '../../../../hooks/case/useEditCaseActions';
import { LIST_PRIORITIES, LIST_STATUS } from '../../../../common/types';
import { EXTERNAL_ROLES } from '../../../../common/rolesPermissions';

export const EditCaseModal = ({ isOpen, onClose, claim, onSave, USER_PERMISSIONS, accessRole }) => {

    const { isLoading, handleEditCase } = useEditCaseActions({ claimId: claim._id });

    const [oldStatus, setOldStatus] = useState(claim.status);
    const [newStatus, setNewStatus] = useState(claim.status);
    const [newPriority, setNewPriority] = useState(claim.priority);

    const [actionTaken, setActionTaken] = useState('');
    const [showActionFields, setShowActionFields] = useState(false);

    const [oldResolution, _] = useState(claim.resolution || '');
    const [resolutionDetails, setResolutionDetails] = useState(claim.resolution || '');
    const [showResolutionFields, setShowResolutionFields] = useState(false);

    const [showHistoryActions, setShowHistoryActions] = useState(false);
    const [historyActions, setHistoryActions] = useState(claim.actionHistory || []);

    const [abandonCase, setAbandonCase] = useState(false);

    const isreclamante = accessRole === EXTERNAL_ROLES.RECLAMANTE;
    const allowedStatusesForreclamante = ["Cerrado", "Resuelto"];

    const handleSave = async () => {

        let hasChanged = actionTaken;

        if (actionTaken) {
            setHistoryActions(prev => [...prev, { action: actionTaken, timestamp: Date.now() }]);
            setActionTaken(''); // Limpiar el campo de acción después de guardarla
        }

        const newClaim = {
            ...claim,
            status: abandonCase ? 'Abierto' : newStatus,
            priority: newPriority,
            actionHistory: historyActions,
            resolution: resolutionDetails,
            assignedOperator: abandonCase ? null : claim.assignedOperator,
            resolutionDate: resolutionDetails !== claim.resolution ? Date.now() : claim.resolutionDate
        };

        hasChanged = hasChanged || JSON.stringify(newClaim) !== JSON.stringify(claim);

        const response = await handleEditCase({ newClaim, hasChanged });
        if (response.hasError) return;

        onSave(newClaim, abandonCase);

        if (hasChanged) onClose(); // Si hubo cambios se cierra el modal, sino se mantiene abierto.

    };

    const toggleActionFields = () => {
        setShowActionFields(prev => !prev);
        setActionTaken(''); // Limpiar el campo de acción si se oculta
    }

    const toggleResolutionFields = () => {
        if (showResolutionFields) {
            setShowResolutionFields(false);
            setResolutionDetails(oldResolution);
            setNewStatus(oldStatus);
        } else {
            setShowResolutionFields(true);
            setNewStatus('Resuelto');
        }
    }

    return (
        <Dialog open={isOpen} onClose={!isLoading ? onClose : null} maxWidth='sm' fullWidth>
            <DialogTitle fontWeight={'bold'}>Editar Reclamo</DialogTitle>

            <DialogContent>

                {!isreclamante &&
                    <>
                        {/* Cambiar prioridad */}
                        <TextField
                            select
                            label="Prioridad"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            SelectProps={{ native: true }}
                        >
                            {LIST_PRIORITIES.map((priority) => (
                                <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </TextField>
                    </>
                }
                {/* Cambiar estado */}
                <TextField
                    select
                    label="Estado"
                    disabled={showResolutionFields || abandonCase}
                    value={abandonCase ? "Abierto" : newStatus}
                    onChange={(e) => {
                        setNewStatus(e.target.value);
                        setOldStatus(e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    SelectProps={{ native: true }}
                >
                    {LIST_STATUS.map((status) => {

                        return (
                            <option
                                key={status} value={status}
                                disabled={isreclamante && !allowedStatusesForreclamante.includes(status)}
                            >{status}</option>
                        )
                    }
                    )}
                </TextField>

                {!isreclamante &&
                    <>
                        {/* Botones para mostrar/ocultar campos de acción y historial */}
                        <Button
                            variant="outlined"
                            color={'info'}
                            disabled={showActionFields || showResolutionFields}
                            onClick={() => setShowHistoryActions(prev => !prev)}
                            startIcon={<ListIcon />}
                            sx={{ mt: 2, mb: showHistoryActions ? 2 : 0 }}
                        >
                            {showHistoryActions ? 'Ocultar Acciones' : 'Ver Acciones'}
                        </Button>

                        {showHistoryActions && (
                            <Box mb={1} sx={{
                                border: '1px solid',
                                borderColor: 'info.main',
                                borderRadius: 1,
                                padding: 1,
                                backgroundColor: 'background.default',
                                maxHeight: 140,
                                overflowY: 'auto',
                            }}>
                                {historyActions.length > 0 ? (
                                    historyActions.map((history, index) => (
                                        <Typography key={index} variant="body2">
                                            {moment(history.timestamp).format("llll")} - {history.action}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography>No hay acciones registradas.</Typography>
                                )}
                            </Box>
                        )}

                        {/* Botones de acciones y resolución */}
                        <Box display={'flex'} justifyContent="space-between" mb={1}>
                            <Button
                                variant="outlined"
                                color={showActionFields ? 'error' : 'primary'}
                                onClick={toggleActionFields}
                                disabled={showResolutionFields || showHistoryActions}
                                startIcon={showActionFields ? <CancelIcon /> : <AddTaskIcon />}
                                sx={{ mt: 1 }}
                            >
                                {showActionFields ? 'Eliminar Acción' : 'Registrar Acción'}
                            </Button>

                            <Button
                                variant="outlined"
                                color={showResolutionFields ? 'error' : 'warning'}
                                onClick={toggleResolutionFields}
                                disabled={showActionFields || showHistoryActions}
                                startIcon={showResolutionFields ? <CancelIcon /> : <ChatIcon />}
                                sx={{ mt: 1 }}
                            >
                                {showResolutionFields && !oldResolution
                                    ? 'Eliminar Resolución'
                                    : (oldResolution ? 'Modificar Resolución' : 'Establecer Resolución')}
                            </Button>
                        </Box>

                        {/* Campos de acción */}
                        {showActionFields && (
                            <>
                                <FormControlLabel
                                    color='error'
                                    control={<Checkbox checked={abandonCase} color='warning' onChange={(e) => setAbandonCase(e.target.checked)} />}
                                    label="Abandonar reclamo"
                                    sx={{ color: orange[500] }}
                                />
                                <TextField
                                    label="Acción realizada"
                                    value={actionTaken}
                                    onChange={(e) => setActionTaken(e.target.value)}
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}

                        {showResolutionFields &&
                            <TextField
                                label="Detalles de resolución"
                                color="warning"
                                value={resolutionDetails}
                                onChange={(e) => setResolutionDetails(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={3}
                                fullWidth
                                margin="normal"
                            />
                        }
                    </>}


                <DialogActions sx={{ mt: 2 }}>

                    <Button variant="contained" color="secondary" disabled={isLoading} onClick={onClose} >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="primary" /> : null}
                    >
                        {!isLoading ? 'Guardar Cambios' : 'Guardando...'}
                    </Button>

                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};


