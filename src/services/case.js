import UseApi from "../hooks/useApi";


export const caseService = {

    useGetAllCases: ( ) => UseApi(
    `/claim`,
    {
        method: 'GET',
    }
    ),

    useGetMyCases: ( { username } ) => UseApi(
        `/claim/involved/${username}`,
        {
            method: 'GET',
        }
    ),

    useEditCase: ( {claimId} ) => UseApi(
        `/claim/${claimId}`,
        {
            method: 'PUT',
        }
    ),
    
    
    usePutOperatorInCase: ( {claimId, employeeId} ) => UseApi(
        `/claim/${claimId}/operators/${employeeId}`,
        {
            method: 'PUT',
        }

    ),

    useGetDashboard: () => UseApi(
        `/claim/dashboard`,
        {
            method: 'GET',
        }
    ),

    useGetChatHistory: ( { claimId } ) => UseApi(
        `/claim/${claimId}/chat`,
        {
            method: 'GET'
        }
    )

}

