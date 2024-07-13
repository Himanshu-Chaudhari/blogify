import Appbar from "../components/appbar";
import BlogCard from "../components/blogCard";
import Loader from "../components/loader";
import { getBlogsBulk } from "../hooks/getBlogsBulk";

export interface postInterface{
    title : String,
    content : String,
    created : String,
    author : {
        name : String
    },
    id : String
}
export default function Blogs() {
    const {loading , blogs } = getBlogsBulk()
    if(loading){
        return(
            <Loader></Loader>
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
                        blogs.map((element : postInterface , index )=>{
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
