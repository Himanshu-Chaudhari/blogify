import axios from "axios";
import Appbar from "../components/appbar";
import BlogCard from "../components/blogCard";
import Loader from "../components/loader";
import { GetMyBlogs } from "../hooks/getMyBlogs";
import { useNavigate } from "react-router-dom";

export interface postInterface {
    title: String,
    content: String,
    created: String,
    author: {
        name: String
    },
    id: String
}
export default function MyBlogs() {
    const { loading, blogs } = GetMyBlogs()
    const navigate=useNavigate()
    const deleteBlog=(id : String)=>{
        console.log(id)
        axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/v1/blog/${id}`,{
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            alert("Blog Deleted")
            navigate('/blogs')
            console.log(res);
        })
    }
    if (loading) {
        return (
            <>
                <Appbar></Appbar>
                <Loader></Loader>
            </>
        )
    }
    if(blogs.length==0){
        return(
            
            <div>  
                <div>
                    <Appbar/>
                </div>
                <div className="flex justify-center items-center font-semibold text-2xl h-52 ">
                    You haven't written any blogs.
                </div>
            </div>
        )
    }
    return (
        <div>
            <div>
                <Appbar/>
            </div>
            <div className="flex justify-center">
                <div className="w-3/6">
                    {
                        blogs.map((element: postInterface, index) => {
                            return <>
                                <div className="flex">
                                    <BlogCard key={index} id={element.id} title={element.title} content={element.content} created={element.created} author={element.author} ></BlogCard>
                                    <div className="m-4">
                                        <button onClick={()=>deleteBlog(element.id)} className="bg-white border border-gray-300 rounded-md shadow-sm block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">DELETE</button>
                                    </div>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
