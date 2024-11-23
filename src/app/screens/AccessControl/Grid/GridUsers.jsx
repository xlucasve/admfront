import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { columnsUsers } from './columnsUsers';
import { Box, Button } from '@mui/material';
import { GridContainer } from '../../../components/GridItems/GridContainer';
import { useModal } from '../../../../context/ModalProvider';
import { CustomToolBar } from '../../../components/GridItems/CustomToolBar';
import Header from '../../../components/Header';
import { MODALS_TYPES } from '../../../../common/types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { GRID_ACTIONS } from './GridReducer';



export const GridUsers = ({ USER_PERMISSIONS, state, dispatch }) => {

    const { openModal } = useModal();


    const handlePutOnSave = (updatedRow) => {
        dispatch({ type: GRID_ACTIONS.SAVE_ROW, payload: updatedRow })
        handleSuccessOnSave()
    }

    const handlePostOnSave = (newRow) => {
        dispatch({ type: GRID_ACTIONS.ADD_NEW_ROW, payload: newRow })
        handleSuccessOnSave()
    }

    const handleDeleteOnSave = (deletedRowId) => {
        dispatch({ type: GRID_ACTIONS.DELETE_ROW, payload: deletedRowId })
    }

    const handleSuccessOnSave = () => {
        setTimeout(() => {
            dispatch({ type: GRID_ACTIONS.SHOW_SUCCESS });
        }, 1500);
    }


    const cols = columnsUsers({
        editableRowId: state.editableRowId,
        isSavingSuccess: state.isSavingSuccess,
        isLoadingSuccess: state.isLoadingSuccess,
        handlePutOnSave,
        handleDeleteOnSave,
        openModal,
        USER_PERMISSIONS
    });


    return (
        <>

            <Box display={'flex'} justifyContent={'space-between'}>
                <Header title="Control de Acceso" />
                {USER_PERMISSIONS?.POST_USER &&
                    <Button
                        onClick={() => openModal({ type: MODALS_TYPES.PUT_POST_USER, onSave: handlePostOnSave })}
                        variant="contained"
                        color="primary"
                        sx={{
                            marginBottom: "20px",
                            marginRight: "15px"
                        }}
                        startIcon={<PersonAddIcon />}>
                        Agregar Empleado</Button>
                }
            </Box>
            <GridContainer>
                <DataGrid
                    columns={cols}
                    rows={state.rows}
                    rowCount={state.totalUsers}
                    getRowId={(row) => row._id}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    pagination
                    paginationMode="server"

                    paginationModel={state.paginationModel}
                    onPaginationModelChange={(newModel) =>
                        dispatch({ type: 'SET_PAGINATION_MODEL', payload: newModel })
                    }
                    slots={{ toolbar: CustomToolBar }}
                    disableRowSelectionOnClick
                    hideFooterSelectedRowCount
                    isCellEditable={(params) => params.row._id === state.editableRowId}
                    sx={{
                        '.MuiDataGrid-columnHeader': {
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                        },
                    }}
                />

            </GridContainer>
        </>
    );
};




