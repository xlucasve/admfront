/* eslint-disable no-undef */
import { useEffect } from "react"
import usePostLogin from "../../services/auth/usePostLogin"
import { useAlert } from "../../context/AlertProvider"
import { useAuth } from "../../context/AuthProvider"

const useLoginActions = () => {

    const { auth, setAuth } = useAuth()
    const { callApi, data, isError, isLoading } = usePostLogin()
    const { showAlert } = useAlert();

    useEffect(() => {
        if (isError) {
            showAlert('Ocurrió un error al inciar sesión. Verifique los datos e intente nuevamente.', 'error')
        }
    }, [isError])

    useEffect(()=>{
        if (isError || !data || isLoading) return;

        localStorage.setItem('smartmove-userid', data.user._id)
        localStorage.setItem('smartmove-user-permissions', JSON.stringify(data.USER_PERMISSIONS));

        setAuth({
            ...auth,
            id: data.user._id,
            ...data.user
        })

        

    }, [isLoading, data])


    return{
        isLoadingLogin: isLoading,
        callApiLogin: callApi,
    }

}

export default useLoginActions