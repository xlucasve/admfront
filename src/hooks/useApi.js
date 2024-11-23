/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';

const UseApi = (endpoint, config) => {

    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState(null)

    const [isError, setIsError] = useState(false)

    // const { jwt } = useUserDataStore()

    const {
        method,
        callOnLoad = false,
    } = config

    const callApi = async (dataApi = {}, addEndpoint = '') => {

        setIsLoading(true)

        setIsError(false)

        let responseData = null
        let hasError = false

        const token = localStorage.getItem('smartmove-token') || ''

        try {

            const completeOptions = {
                method,
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(dataApi)
            }

            const { body, ...optionsGet } = completeOptions

            const options = method === 'GET' ? optionsGet : completeOptions

            await fetch(import.meta.env.VITE_API_URL_BACKEND + endpoint + addEndpoint || '', options)
                .then(async (response) => {

                    const data = await response.json()
                    if (response.status < 300) {
                        setData(data || null)

                        responseData = data || null

                        setIsError(false)
                    } else {

                        const {
                            code = '',
                            message = 'Ha ocurrido un error, intente más tarde'
                        } = data.data

                        setData({ code, msg: message })

                        responseData = { code, msg: message }

                        hasError = true

                        setIsError(true)
                    }


                }).catch((error) => {

                    console.log(error)

                    const {
                        code = '',
                        msg = 'Ha ocurrido un error, intente más tarde'
                    } = error?.response?.data

                    setData({ msg })

                    responseData = { code, msg }

                    hasError = true

                    setIsError(true)

                }).finally(() => setIsLoading(false))


        } catch (error) {

            setData({ msg: 'Ha ocurrido un error, intente más tarde' })

            setIsError(true)

            hasError = true

            setIsLoading(false)

        }

        return { response: responseData, hasError }

    }

    useEffect(() => {
        if (callOnLoad) callApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        isLoading,
        isError,
        data,
        callApi,
    }

}

export default UseApi