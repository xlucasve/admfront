
import { useAlert } from "../../context/AlertProvider";
import { caseService } from "../../services/case";


const useEditCaseActions = ({ claimId }) => {

    const { callApi, isLoading, data, isError } = caseService.useEditCase({ claimId });
    const { showAlert } = useAlert();


    const handleEditCase = async ({ newClaim, hasChanged = false }) => {

        if(!hasChanged){
            showAlert('No se han realizado cambios', 'info');
            return;
        }

        const response = await callApi( newClaim );

        response.hasError 
            ? showAlert('Error al editar caso', 'error')
            : showAlert('Caso editado correctamente', 'success');

        return response;

    };


    return {
        isLoading,
        handleEditCase,
        isError,
    }
}




export default useEditCaseActions;