import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


type CreateUserRequest = {
    auth0Id:string,
    email:string, 
}


export const useCreateMyUser = () =>{
    const {getAccessTokenSilently} = useAuth0();



    const createMyUserRequest = async (user:CreateUserRequest)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"POST",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "content-Type":"application/json",
            },
            body:JSON.stringify(user),
        });

        if(!response.ok){
            throw new Error("Failed to create user");
        }
    };

    const { mutateAsync: createUser, isPending, isError, isSuccess } = useMutation({
        mutationFn: createMyUserRequest,
    });

    return {
        createUser,
        isLoading: isPending,
        isError,
        isSuccess,
    };
}