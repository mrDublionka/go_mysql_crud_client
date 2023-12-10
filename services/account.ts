import ServiceResponse from "@/interfaces/serviceResponse";
import UserInterface from "@/interfaces/user";
import {getAuthToken, setAuthToken, deleteAuthToken} from '../utils/cookies'
import fetchDatas from './interceptors';


let endpoint = process.env.NEXT_PUBLIC_API

const toogleFetch = (url:string, params:any) => {
    return fetchDatas(url, params)
}

export const fetchPublicUser = async (id:number) => {
    let response:ServiceResponse = {
        error: false,
    }

    const data = {
        id: id
    }

    try {

        const req = await fetch(endpoint +'fetchUser.php', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        const body = await req.json();

        if(!body.user){
            response.error = true;
            response.message = 'Unknown error'
            return response

        } else if (body.user) {
            response.error = false;
            response.message = body.message
            response.response = body.user
        }

        // response.response = body

        return response

    } catch(e){

    }
}

export const signUpService  = async (user:string, email:string, pass:string, image?:string) => {

    let response:ServiceResponse = {
        error: false,
    }

    const userData = image? {
        user_name: user,
        user_email: email,
        user_pwd: pass,
        image: image
    } : {
        user_name: user,
        user_email: email,
        user_pwd: pass,
    }

    try {
        // console.log(userData)
        const req = await fetch(endpoint + '/user/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),

        })

        const body = await req.json()

        if (body.user_name.length) {
            response.error = false;
            response.message = "ok"
            response.response = body
        }


        return response

    } catch(error) {
        response.error = true;
        response.message = 'unknown error'
        console.error(error)
        return response
    }

}

export const logInService = async (email: string, pwd: string): Promise<ServiceResponse> => {
    let response: ServiceResponse = {
        error: false
    };

    if(!email.length || !pwd.length) {
        response.error = true;
        response.message = 'complete all fields before submiting!'

        return response
    }

    try {
        const user = {
            user_email: email,
            user_pwd: pwd
        }

        const req = await fetch( endpoint + '/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const body = await req.json()

        if(body.hasOwnProperty('token')) {
            response.message = 'Success';
            response.response = body.token;
            response.error = false
        } else {
            response.error = true;
            response.message = body.message
        }

        return response

    } catch(err) {
        response.error = true;
        response.message = 'Could not log in'

        return response
    }
}

export const fetchProfile = async (): Promise<ServiceResponse> => {

    let response: ServiceResponse = {
        error: false
    }

    const token:string = getAuthToken();

    if(!token.length) {
        response.error = true;
        response.message = '';

        return response;
    }

    try {
        const request = await fetch(endpoint + '/user/profile', {
            method: 'post',
            headers: {
                "Authorization": token
            }
        });

        const body = await request.json()


        if(body.hasOwnProperty("ID")){
            response.response = body
            response.message = "Success"
        }

        return response

    } catch(error) {
        response.error = true;
        response.message = 'unknown error'

        return response
    }
}

export const fetchPopularUsers = async (): Promise<ServiceResponse> => {

    let response: ServiceResponse = {
        error: false
    }

    try {

        const request = await fetch(endpoint + 'fetchPopularUsers.php', {
            method: 'GET',
        });

        const body = await request.json()

        if(Array.isArray(body.users)){
            response.response = body.users
        }

        return response

    } catch(error) {
        response.error = true;
        response.message = 'unknown error'

        return response
    }
}

