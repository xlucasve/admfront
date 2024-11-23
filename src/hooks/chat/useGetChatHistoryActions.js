import { useEffect } from "react";
import { caseService } from "../../services/case";
import { useAlert } from "../../context/AlertProvider";
import { downloadAsJSON } from "../../utils/downloadAsJSON";

export const useGetChatHistoryActions = ( { claimId, claimTitle, claimAuthor } ) => {

    const { callApi, isLoading } = caseService.useGetChatHistory( { claimId } );
    const { showAlert } = useAlert();

    const handleGetChat = async () => {
        const response = await callApi();

        if(response.hasError){
            showAlert('Error al descargar el chat', 'error');
            return;
        }

        if (response.response?.messages.length === 0) {
            showAlert('El chat no tiene contenido.', 'info')
            return;
        }

        downloadAsJSON(response.response.messages, `chat_${claimAuthor}_${claimTitle}.json`)
        
        return;
    }


    return {
        isLoading,
        handleGetChat
    }
}