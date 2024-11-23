import React, { useEffect, useState } from 'react'

import { Box, LinearProgress } from '@mui/material'
import Header from '../../components/Header'
import ItemDashboard from '../../components/ItemDashboard/ItemDashboard'

import './Dashboard.scss'
import GraphDashboard from '../../components/GraphDasboard/GraphDashboard'
import { useGetDashboardActions } from '../../../hooks/case/useGetDashboardActions'

const Dashboard = () => {

    const [data, setData] = useState({});
    const { isLoading, handleGetDashboard } = useGetDashboardActions();

    useEffect(() => {
        handleGetDashboard().then((response) => {
            setData(response)
        }
        );
    }, []);


    if (isLoading) {
        return <LinearProgress />
    }

    return (
        <Box margin={"15px"}>
            <Header
                title="Dashboard"
                id="dashboard-titulo"
            />
            <div className="dashboard-grid">

                <ItemDashboard
                    title="Reclamos nuevos"
                    cuantity={data?.newClaimsThisWeek}
                    extraInfo={`En esta semana se crearon ${data?.newClaimsThisWeek} nuevos reclamos`}
                    id="dashboard-reclamos-nuevos"
                />

                <ItemDashboard
                    title="Mediaciones nuevas"
                    cuantity={data?.newMediationsThisWeek}
                    extraInfo={`En esta semana se crearon ${data?.newMediationsThisWeek} nuevas mediaciones`}
                    id="dashboard-mediaciones-nuevas"
                />

                <ItemDashboard
                    title="Reclamos activos"
                    cuantity={data?.claimsInProgress}
                    extraInfo={`Hay ${data?.claimsInProgress} reclamos en progreso`}
                    id="dashboard-reclamos-activos"
                />

                <ItemDashboard
                    title="Mediaciones activas"
                    cuantity={data?.mediationsInProgress}
                    extraInfo={`Hay ${data?.mediationsInProgress} mediaciones en progreso`}
                    id="dashboard-mediaciones-activas"
                />
            </div>

            <GraphDashboard
                claimsByCategory={data?.claimsByCategory}
                arbitrationsByCategory={data?.arbitrationsByCategory}
            />
        </Box>
    )
}

export default Dashboard