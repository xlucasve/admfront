import UseApi from '../../hooks/useApi';

const usePostSignUp = () => UseApi(
    `/user`,
    {
        method: 'POST',
    }
)

export default usePostSignUp