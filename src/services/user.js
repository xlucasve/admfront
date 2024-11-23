import UseApi from "../hooks/useApi";


export const userService = {

    useGetUsers: () => UseApi (
        `/users`,
        {
            method: "GET",
        }
    ),

    usePostUser: () => UseApi (
        `/users`,
        {
            method: "POST"
        }
    ),

    useDeleteUser: ( { userId } ) => UseApi (
        `/users/${userId}`,
        {
            method: 'DELETE',
        }
    ),

    usePutUser: ( { userId } ) => UseApi (
        `/users/${userId}`,
        {
            method: 'PUT'
        }
    )


}
