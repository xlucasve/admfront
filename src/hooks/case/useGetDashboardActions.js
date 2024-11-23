import { useEffect } from "react";
import { caseService } from "../../services/case";
import { useAlert } from "../../context/AlertProvider";

export const useGetDashboardActions = () => {
    const { callApi, isLoading, data, isError } = caseService.useGetDashboard();
    const { showAlert } = useAlert();

    const handleGetDashboard = async () => {
        const response = await callApi();
        if(response.hasError){
            showAlert('Error al cargar el dashboard', 'error');
            return;
        }
        return response.response;
    }


    return {
        isLoading,
        handleGetDashboard
    }
}