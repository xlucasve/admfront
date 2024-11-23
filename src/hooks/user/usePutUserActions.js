import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";

export const usePutUserActions = ( { userId } ) => {

    const { callApi, isLoading } = userService.usePutUser( { userId } );
    const { showAlert } = useAlert();

    const handlePutUser = async ( newUser, hasChanged ) => {
            
            if (!hasChanged) {
                showAlert('No se han realizado cambios', 'info');
                return;
            }

            const response = await callApi( newUser );
    
            response.hasError 
                ? showAlert('Error al modificar usuario', 'error')
                : showAlert('Usuario modificado correctamente', 'success')
            
            
            return response;
        }



    return {
        handleCallApi: handlePutUser,
        isLoading,
    }
}