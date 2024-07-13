import Appbar from "../components/appbar";
import BlogCard from "../components/blogCard";
import Loader from "../components/loader";
import { GetMyBlogs } from "../hooks/getMyBlogs";

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
                                <BlogCard key={index} id={element.id} title={element.title} content={element.content} created={element.created} author={element.author} ></BlogCard>
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
