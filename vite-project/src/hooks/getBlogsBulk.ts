import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'

interface postInterface{
    title : String,
    content : String,
    created : String,
    author : {
        name : String
    },
    id : String
}

export function getBlogsBulk() {
    const [blogs , setBlogs]=useState<postInterface[]>([])
    const [loading , setLoading]=useState(true)
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk/`,{
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
