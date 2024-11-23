import React, { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SideBar from '../app/components/global/SideBar'
import { Box, LinearProgress, useMediaQuery } from '@mui/material'
import TopBar from '../app/components/global/TopBar'
import { useMode } from '../styles/theme'
import { useGlobal } from '../context/global/globalContext'
import { SIDEBAR_SIZE } from '../common/types'
import { PATH_VIEWS } from '../common/rolesPermissions'
import { useAuth } from '../context/AuthProvider'
import { Unauthorized } from '../app/screens/Error/Unauthorized'
import { NotFound } from '../app/screens/Error/NotFound'

const ProtectedRoute = () => {
    const { globalState, toggleSidebar } = useGlobal();
    const { auth, isLoading, USER_PERMISSIONS } = useAuth();

    const location = useLocation();

    const [theme] = useMode()


    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const sidebarWidth = isMobile ? (globalState.sidebarOpen
        ? SIDEBAR_SIZE.CLOSE_MOBILE : SIDEBAR_SIZE.OPEN - 1) : (globalState.sidebarOpen ? SIDEBAR_SIZE.CLOSE : SIDEBAR_SIZE.OPEN - 1);


    if (isLoading) {
        return (
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LinearProgress />
            </div>
        )
    }

    return (
        <>
            {
                auth?._id
                    ?
                    (

                        <Box width="100%" height="100%" display='flex' position='relative'>
                            <SideBar USER_PERMISSIONS={USER_PERMISSIONS} accessRole={auth.accessRole} />
                            <Box width="100%" height="100%"
                                sx={{
                                    paddingLeft: `${sidebarWidth}px`,
                                    width: '100%',
                                    minHeight: '100vh',
                                    transition: 'padding-left 0.3s ease',
                                }}
                            >
                                <TopBar toggleSidebar={toggleSidebar} />
                                {
                                    USER_PERMISSIONS !== undefined && USER_PERMISSIONS[PATH_VIEWS[location.pathname]]
                                        ? <Outlet />
                                        : !Object.prototype.hasOwnProperty.call(PATH_VIEWS, location.pathname)
                                            ? <NotFound />
                                            : <Unauthorized />
                                }

                            </Box>
                        </Box>
                    ) :
                    (
                        <Navigate to={'/auth'} />
                    )
            }
        </>
    )
}

export default ProtectedRoute