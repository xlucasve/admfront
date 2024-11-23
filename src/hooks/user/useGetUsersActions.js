import { useEffect } from "react";
import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";


export const useGetUsersActions = (userId, state, dispatch) => {
    const { showAlert } = useAlert();
    const { callApi, isLoading } = userService.useGetUsers();

    const handleGetUsers = async () => {
        const {response, hasError} = await callApi({}, `?page=${state.paginationModel.page}&limit=${state.paginationModel.pageSize}`);

        if(hasError){
            showAlert('Error al cargar los usuarios', 'error');
            return;
        }
         dispatch({ type: 'SET_ROWS', payload: { foundUsersPaginated: response.foundUsersPaginated, totalUsers: response.totalUsers } });
        
    }


    useEffect(() => {
        handleGetUsers();
    }, [state.paginationModel.page, state.paginationModel.pageSize]);

    return {
        isLoading,
    }
}
