import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from '../config'

interface postInterface{
    title : String,
    content : String,
    author : {
        name : String
    },
    id : String
}

export function getSpecificBlogs(id : string|undefined) {
    const [blog , setBlog]=useState<postInterface>({
        title : "String",
        content : "String",
        author : {
            name : "String"
        },
        id : "String"
    })
    const [loading , setLoading]=useState(true)
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response =>{
            setBlog(response.data.blog)
            console.log(blog)
            setLoading(false)
        })
    },[id]);
    return {
        loading,
        blog
    }
}
