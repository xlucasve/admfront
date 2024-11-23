import React from 'react'

import { Typography } from '@mui/material';

import './ItemDashboard.scss'

const ItemDashboard = ({
    title,
    cuantity,
    ico,
    extraInfo,
    id,
}) => {
    return (
        <div className='item-dashboard'>
            <Typography variant="h5" gutterBottom id={`${id}-titulo`}>
                {title}
            </Typography>
            <Typography variant="h3" gutterBottom id={`${id}-cantidad`}>
                {cuantity}
            </Typography>
            <Typography variant="body2" gutterBottom color='info' id={`${id}-extra`}>
                {extraInfo}
            </Typography>
        </div>
    );
}

export default ItemDashboard;