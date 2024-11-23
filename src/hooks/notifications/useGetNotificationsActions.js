import { useEffect } from "react"

import useGetNotifications from "../../services/notifications/useGetNotifications"

const useGetNotificationsActions = ({
    setNotifications
}) => {

    const { data, isError, isLoading } = useGetNotifications()

    useEffect(() => {
        if (isError) {
            // TODO: mostrar un modal que diga que ocurrió un error
        }
    }, [isError])

    useEffect(()=>{
        if(isError) return
        if(!data) return

        if(!isLoading && data){
            // TODO: get de notificaciones exitoso
            // setNotifications(data.data.notifications)
            setNotifications([])
        }

    }, [isLoading, data])

    return{
        isLoadingNotifications: isLoading,
    }

}

export default useGetNotificationsActions