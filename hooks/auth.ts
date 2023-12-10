import { fetchProfile, logInService } from "@/services/account"
import { getAuthToken, deleteAuthToken, setAuthToken } from "@/utils/cookies"
import { useDispatch, useSelector } from 'react-redux'
import {updateUserData, userIsUpdating} from '@/store/account/actions'
import UserInterface from "@/interfaces/user";
import { useRouter } from "next/router";


function useAuth(){
    // @ts-ignore
    const update: boolean = useSelector((state):any => state.account.updating);
    // @ts-ignore
    const user: UserInterface = useSelector((state):any => state.account.user);
    const dispatch = useDispatch()
    const router = useRouter()

    const updateProfile = async () => {

        const token = getAuthToken();

        dispatch(userIsUpdating(true))

        if(token){
            const data = await fetchProfile()
            dispatch(userIsUpdating(false))
            dispatch(updateUserData(data.response))
        }
    }

    const isUpdating = () => {
        return update
    }

    const getUser = () => {
        
        return user
        
    }

    const isLoggedIn = (): boolean => {
        let logged: boolean = user !== undefined

        return logged
    }

    const logIn = async (email:string, pwd: string) => {

        dispatch(userIsUpdating(true))

        const data = await logInService(email, pwd);

        if(data.error) {
            dispatch(userIsUpdating(false));
        }

        if(!data.error && data.response) {
            setAuthToken(data.response)

            const user = await updateProfile()

            dispatch(updateUserData(data.response))
            dispatch(userIsUpdating(false))
            setTimeout(() => {
              router.push("/");
            }, 1000);
        }
    }

    const logOut = () => {
        deleteAuthToken()

        dispatch(userIsUpdating(true))
        // @ts-ignore
        dispatch(updateUserData(undefined))
        dispatch(userIsUpdating(false))
    }

    return {
        logIn,
        updateProfile,
        isUpdating,
        getUser,
        isLoggedIn,
        logOut
    }
}


export default useAuth