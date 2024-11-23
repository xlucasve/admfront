import { Box } from '@mui/material'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'

export const CustomToolBar = () => {
    return (

        <GridToolbarContainer
            sx={{
                display: 'flex', justifyContent: 'space-between',
                marginRight: 3,
                paddingBottom: 1
            }}>
            <Box>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </Box>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    )
}
