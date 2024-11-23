import React, { createContext, useContext, useEffect, useReducer } from 'react'

import GlobalReducer from './globalReducer'

import {
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    TOGGLE_SIDEBAR
} from '../../common/types'


export const globalInitialState = {
    loading: false,
}

export const GlobalContext = createContext(null)

export const useGlobal = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {

    const [globalState, dispatch] = useReducer(
        GlobalReducer,
        {
            ...globalInitialState,
            sidebarOpen: true,
        }
    )

    const setLoadingTrue = () => {
        dispatch({
            type: SET_LOADING_TRUE,
        })
    }
    const setLoadingFalse = async () => {
        dispatch({
            type: SET_LOADING_FALSE
        })
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    return (
        <GlobalContext.Provider
            value={{
                globalState,
                setLoadingTrue,
                setLoadingFalse,
                toggleSidebar
            }}>
            {children}
        </GlobalContext.Provider>
    )

}
