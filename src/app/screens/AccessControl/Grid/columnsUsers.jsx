import { Box, Button, CircularProgress, Fab, IconButton, Menu, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { MODALS_TYPES } from '../../../../common/types';
import { blue, green } from '@mui/material/colors';
import { Check } from '@mui/icons-material';
import { INTERNAL_ROLES } from '../../../../common/rolesPermissions';


export const columnsUsers = ({
    editableRowId,
    handlePutOnSave,
    handleDeleteOnSave,
    openModal,
    isSavingLoading = false,
    isSavingSuccess = false,
    USER_PERMISSIONS
}) => [
        {
            field: 'cuit',
            headerName: 'CUIT',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'accessRole',
            headerName: 'Rol',
            flex: 1,
            minWidth: 150,
            type: 'singleSelect',
            valueOptions: Object.values(INTERNAL_ROLES),
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },

        {
            field: 'fullName',
            headerName: 'Nombre',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'String',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'birthDate',
            headerName: 'Nacimiento',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            type: 'String',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        // {
        //     field: 'location',
        //     headerName: 'Localidad',
        //     type: 'String',
        //     flex: 1,
        //     minWidth: 150,
        //     renderCell: (params) => (
        //         <Tooltip title={params.value}>
        //             <span>{params.value}</span>
        //         </Tooltip>
        //     ),
        // },
        // {
        //     field: 'address',
        //     headerName: 'Dirección',
        //     type: 'String',
        //     flex: 1,
        //     minWidth: 150,
        //     renderCell: (params) => (
        //         <Tooltip title={params.value}>
        //             <span>{params.value}</span>
        //         </Tooltip>
        //     ),
        // },

        {
            field: 'position',
            headerName: 'Posición',
            type: 'String',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'department',
            headerName: 'Departamento',
            type: 'String',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'entryDate',
            headerName: 'Ingreso',
            // type: 'date',
            flex: 1,
            minWidth: 150,
        },

        ...(USER_PERMISSIONS?.DELETE_USER || USER_PERMISSIONS?.PUT_USER ? [{
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Box>
                    {params.row._id === editableRowId
                        ?
                        <Box marginX={'auto'} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                            <IconButton sx={{ backgroundColor: isSavingLoading ? 'black' : green[700] }}>
                                {isSavingSuccess && <Check sx={{ color: '#000' }} />}
                            </IconButton>

                        </Box>
                        :
                        <>{USER_PERMISSIONS?.DELETE_USER &&
                            <Tooltip title="Eliminar">
                                <IconButton onClick={() => openModal({ type: MODALS_TYPES.DELETE_USER, data: params.row, onSave: handleDeleteOnSave })}
                                    variant='contained'
                                    color='error'
                                    sx={{ borderRadius: '0', }}
                                    disabled={params.row._id !== editableRowId && editableRowId !== null}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                        }
                            {USER_PERMISSIONS?.PUT_USER &&
                                <Tooltip title="Editar">
                                    <IconButton onClick={() => openModal({ type: MODALS_TYPES.PUT_POST_USER, data: params.row, onSave: handlePutOnSave })}
                                        variant='contained'
                                        color='primary'
                                        sx={{ borderRadius: '0', }}
                                        disabled={params.row._id !== editableRowId && editableRowId !== null}

                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        </>}

                </Box>
            )
        }] : [])

    ];
