import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";



export const usePostUserActions = () => {

    const { callApi, isLoading, } = userService.usePostUser();
    const { showAlert } = useAlert();

    const handlePostUser = async ( newUser ) => {

        const response = await callApi( newUser );

        response.hasError
            ? showAlert('Error al crear usuario', 'error')
            : showAlert('Usuario creado correctamente', 'success')
        
        return response;
    }


    return {
        handleCallApi: handlePostUser,
        isLoading,
    }
}