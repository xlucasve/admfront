import React, { useReducer, useState } from 'react'
import { Box, LinearProgress } from '@mui/material'
import ModalManager from '../../components/ModalManager';
import { GridUsers } from './Grid/GridUsers';
import { useAuth } from '../../../context/AuthProvider';
import { gridReducer, initialState } from './Grid/GridReducer';
import { useGetUsersActions } from '../../../hooks/user/useGetUsersActions';


export const AccessControl = () => {

  const { auth, USER_PERMISSIONS } = useAuth();

  const accessRole = auth.accessRole;

  const [state, dispatch] = useReducer(gridReducer, initialState);
  const { isLoading } = useGetUsersActions(auth._id, state, dispatch);



  return (
    <>

      {isLoading
        ? <LinearProgress />

        : <Box margin={'15px 0 0 15px'}>

          <GridUsers
            USER_PERMISSIONS={USER_PERMISSIONS}
            state={state}
            dispatch={dispatch}
          />

        </Box>
      }

      <ModalManager />

    </>
  )

}
