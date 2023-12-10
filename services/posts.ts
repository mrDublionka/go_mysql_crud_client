import ServiceResponse from "@/interfaces/serviceResponse";
import UserInterface from "@/interfaces/user";
import {getAuthToken, setAuthToken, deleteAuthToken} from '../utils/cookies'
import fetchDatas from './interceptors';
import qs from 'query-string'

const toogleFetch = (url:string, params:any) => {
    return fetchDatas(url, params)
}

let endpoint = process.env.NEXT_PUBLIC_API

export const addPostService = async (data:any) => {
    
    let response:ServiceResponse = {
        error: false,
    }

    const post = {

    }

    try {
        const req = await toogleFetch('/posts', {
            method: 'POST',
            body: data,
        })

        const body = await req.json();

        console.log(body)
        // response.response = body

        return response

    } catch(error){
        console.log('error', error)
        response.error = true;
        response.message = 'unknown error'

        return response
    }

}

export const likePost = async (userId:string, postId:string) => {

    let response:ServiceResponse = {
        error: false,
    }

    const info = {
        postId: postId,
        userId: userId,
    };

    try {
        const req = await toogleFetch('/next-php-blog/server/controllers/addRemoveLike.php', {
            method: 'POST',
            
            body: JSON.stringify(info),
        })

        const body = await req.json();

        response.response = body
    
        return response


    } catch(error){
        response.error = true;
        response.message = 'unknown error'

        return response
    }

}

export const commentPost = async (userId:number, postId: number, content:string) => {
    let response:ServiceResponse = {
        error: false,
    }

    const info = {
        userId: userId,
        postId: postId,
        content: content,
        timeStamp: Date.now()
    };


    try {
        const req = await toogleFetch('/next-php-blog/server/controllers/addComent.php', {
            method: 'POST',
            body: JSON.stringify(info),
        })

        const body = await req.json();

        response.response = body
    
        return response


    } catch(error){
        response.error = true;
        response.message = 'unknown error'

        return response
    }
}

export const fetchPosts = async (date: number, topic: string, limit: number, offset: number) => {

    let response:ServiceResponse = {
        error: false,
    }

    try {

        const query = {
            limit,
            offset,
            date,
            topic
        }

        // const req = await fetch(endpoint+`/posts?`+qs.stringify(query),
        const req = await fetch(endpoint+`/posts`,
            {
                method: "GET",
                headers: {
                    "Accept":"application/json"
                }
            }
        );

        const body = await req.json();

        response.response = body
    
        return response


    } catch(error){
        response.error = true;
        response.message = 'unknown error'

        return response
    }

}

export const fetchPost = async (id:any, ) => {

    let response:ServiceResponse = {
        error: false,
    }

    const query = {
        postId: id,
        
    }

    try {
        const req = await toogleFetch(`/next-php-blog/server/controllers/fetchPost.php?`+qs.stringify(query),
            {
                method: "GET",
            }
        );

        const body = await req.json();

        response.response = body
    
        return response

    } catch(error){
        response.error = true;
        response.message = 'unknown error'

        return response
    }
}





