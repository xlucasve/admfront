import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";


export const useDeleteUserActions = ( { userId } ) => {
    const { callApi, isLoading, } = userService.useDeleteUser( { userId } );
    const { showAlert } = useAlert();

    const handleDeleteUser = async () => {

        const response = await callApi();

        if(response.hasError){
            showAlert('Error al eliminar usuario', 'error');
            return;
        }

        showAlert('Usuario eliminado correctamente', 'success');

        return response.hasError;
    }
    return {
        handleDeleteUser,
        isLoading,
    }
}
