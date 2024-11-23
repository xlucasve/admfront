import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { LinearProgress } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { EXTERNAL_ROLES, INTERNAL_ROLES, VIEWS_PATH } from '../common/rolesPermissions';

const AuthLayout = () => {

    const { auth, isLoading } = useAuth();

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
                !auth?._id ?
                    (
                        <Outlet />
                    ) : (
                        <Navigate to={
                            Object.values(INTERNAL_ROLES).includes(auth.accessRole)
                                ? "/"
                                : (auth.accessRole === EXTERNAL_ROLES.ABOGADO
                                    ? VIEWS_PATH.GET_ALL_CLAIMS
                                    : VIEWS_PATH.GET_MY_CLAIMS)
                        } />
                    )
            }
        </>

    )
}

export default AuthLayout