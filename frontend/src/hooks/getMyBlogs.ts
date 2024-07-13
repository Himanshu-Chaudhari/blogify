import axios from 'axios'
import { useEffect, useState } from 'react'
interface postInterface{
    title : String,
    content : String,
    created : String,
    author : {
        name : String
    },
    id : String
}

export const GetMyBlogs=()=>{
    const [blogs , setBlogs]=useState<postInterface[]>([])
    const [loading , setLoading]=useState(true)
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/myBlogs/`,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response =>{
            setBlogs(response.data.Blogs);
            setLoading(false); 
        })
    },[]);
    return {
        loading,
        blogs
    }
}