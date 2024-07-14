import { useState } from "react"
import Appbar from "./appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function BlogEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate=useNavigate()
    const postABlog=(e : React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        if(title.length<1 || content.split(' ').length<10){
            alert(" Improper Input ")
            return 
        }
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/v1/blog",{
            "title":title,
            "content":content
        },{
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            alert("Blog created");
            navigate('/blogs');
            console.log(res.data)
        })
        console.log("Hello")
    }

    return (
        <div> <Appbar></Appbar>
        <div className="m-5 h-screen">
            <form>
                <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-200 dark:border-gray-300">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-200">
                        <textarea id="title"  className="h-10  w-full  text-lg text-gray-900 bg-white border-0 dark:bg-gray-200 focus:ring-0 dark:text-grey-900 dark:placeholder-gray-400" placeholder={title=='' ? "Title..." : title} required onChange={(e)=>{
                            setTitle(e.target.value)
                        }} ></textarea>
                    </div>
                    <div className="mx-4 my-2 bg-white rounded-t-lg dark:bg-gray-200 border-t dark:border-gray-600">
                        <textarea id="decription" className="h-32 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-200 focus:ring-0 dark:text-grey-900 dark:placeholder-gray-400" placeholder={content=='' ? "Content(min 10 words)" : content} required onChange={(e)=>{
                            setContent(e.target.value)
                        }}></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={(e)=>
                            postABlog(e)} >
                            Post comment
                        </button>
                    </div>
                </div>
            </form>
            <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

        </div>
        </div>
    )
}
