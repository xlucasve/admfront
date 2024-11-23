import UseApi from '../../hooks/useApi';

const usePostLogin = () => UseApi(
    `/login`,
    {
        method: 'POST',
    }
)

export default usePostLogin