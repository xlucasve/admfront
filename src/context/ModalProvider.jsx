/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthProvider';


const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {

    const { auth, USER_PERMISSIONS } = useAuth();

    const [modal, setModal] = useState(null);

    const openModal = ({ type, data = {}, onSave = () => { } }) => {
        setModal({ type, data, userId: auth._id, onSave, username: auth.username, USER_PERMISSIONS, accessRole: auth.accessRole });
    };

    const closeModal = () => {
        setModal(null);
    };

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};