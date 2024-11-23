import UseApi from '../../hooks/useApi';

const useGetNotifications = () => UseApi(
`/user/notifications`,
    {
        method: 'GET',
        callOnLoad: true,
    }
)

export default useGetNotifications