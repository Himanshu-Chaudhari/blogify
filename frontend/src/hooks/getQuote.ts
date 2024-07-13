
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'

export interface quote {
    q:string,
    a:string
}

export const GetQuote=()=>{
    const [quote,setQuote]=useState<quote[]>([{
        q : "Worrying does not take away tomorrow's troubles. It takes away today's peace.",
        a : "Jason Chatfiel"
    }]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/quotes`).then((res)=>{
            setQuote(res.data)
        })
    },[])
    return quote
}