import React from 'react';
import { MODALS_TYPES } from '../../common/types';
import { useModal } from '../../context/ModalProvider';
import { DeleteUserModal } from '../screens/AccessControl/Modals/DeleteUserModal'
import { ChatModal } from '../screens/Case/Modals/ChatModal';
import { PutPostUserModal } from '../screens/AccessControl/Modals/PutPostUserModal';
import { DetailsModal } from '../screens/Case/Modals/DetailsModal';
import { OperatorAcceptModal } from '../screens/Case/Modals/OperatorAcceptModal';
import { EditCaseModal } from '../screens/Case/Modals/EditCaseModal';


const ModalManager = () => {
    const { modal, closeModal } = useModal();

    if (!modal) return null;

    switch (modal.type) {
        case MODALS_TYPES.DETAILS_CASE:
            return <DetailsModal open={true} claim={modal.data} onClose={closeModal} />;
        case MODALS_TYPES.OPERATOR_ACCEPT_CASE:
            return <OperatorAcceptModal open={true} claim={modal.data} onClose={closeModal} onSave={modal.onSave} username={modal.username} />;
        case MODALS_TYPES.EDIT_CASE:
            return <EditCaseModal isOpen={true} claim={modal.data} onClose={closeModal} onSave={modal.onSave} USER_PERMISSIONS={modal.USER_PERMISSIONS} accessRole={modal.accessRole} />
        case MODALS_TYPES.DELETE_USER:
            return <DeleteUserModal open={true} user={modal.data} onClose={closeModal} onSave={modal.onSave} />
        case MODALS_TYPES.CHAT:
            return <ChatModal open={true} claim={modal.data} onClose={closeModal} userId={modal.userId} USER_PERMISSIONS={modal.USER_PERMISSIONS} />
        case MODALS_TYPES.PUT_POST_USER:
            return <PutPostUserModal open={true} onClose={closeModal} onSave={modal.onSave} user={modal.data} />
        default:
            return null;
    }
};

export default ModalManager;
