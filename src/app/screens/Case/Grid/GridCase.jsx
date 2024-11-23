/* eslint-disable react/prop-types */

import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { useModal } from '../../../../context/ModalProvider';
import { tokens } from '../../../../styles/theme';
import { useGetCasesActions } from '../../../../hooks/case/useGetCasesActions'
import { columnsCase } from './ColumnsCase';
import { GridContainer } from '../../../components/GridItems/GridContainer';
import { CustomToolBar } from '../../../components/GridItems/CustomToolBar';

const GridCase = ({ caseType, username, casePath, accessRole, USER_PERMISSIONS }) => {
    const { openModal } = useModal();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { isLoading, totalClaims, cases, paginationModel, setPaginationModel, setCases } = useGetCasesActions({
        caseType,
        username,
    });


    const handleEditSaved = (newClaim, hasAbandonded = false) => {

        if (hasAbandonded) {
            const newCases = cases.filter((claim) => claim._id !== newClaim._id);
            setCases(newCases);
            return;
        }

        // Normal edit
        const newCases = cases.map((claim) => {
            if (claim._id === newClaim._id) {
                return newClaim;
            }
            return claim;
        });



        setCases(newCases);

    }

    const cols = columnsCase(openModal, colors.priority, casePath, handleEditSaved, accessRole, USER_PERMISSIONS);

    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <Box margin={"15px 0 0 15px"}
        >
            <GridContainer>
                <DataGrid
                    rows={cases}
                    rowCount={totalClaims}
                    columns={cols}
                    getRowId={(row) => row._id}

                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    pagination

                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={(newModel) => {
                        setPaginationModel(newModel);
                    }}
                    slots={{ toolbar: CustomToolBar }}
                    hideFooterSelectedRowCount
                    loading={isLoading}
                    sx={{
                        '.MuiDataGrid-columnHeader': {
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                        },
                    }}
                />
            </GridContainer>
        </Box>
    );
};

export default GridCase;
