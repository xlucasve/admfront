import { useContext, useEffect } from "react"

import usePostSignUp from "../../services/users/usePostSignUp"

const useSignUpActions = ({
    setUserData,
    navigate
}) => {

    const { callApi, data, isError, isLoading } = usePostSignUp()

    
    useEffect(() => {
        if (isError) {
            // TODO: mostrar un modal que diga que ocurrió un error
        }
    }, [isError])

    useEffect(()=>{
        if(isError) return
        if(!data) return

        if(!isLoading && data){
            // TODO: Ver en conjunto con el back que data trae cuando se hace el signup exitoso
            // const { jwt, ...userData } = data
            // localStorage.setItem('smartmove-token', jwt)   
            // setUserData(userData, jwt)
            navigate('/')
        }

    }, [isLoading, data])

    return{
        isLoadingSignUp: isLoading,
        callApiSignUp: callApi,
    }

}

export default useSignUpActions