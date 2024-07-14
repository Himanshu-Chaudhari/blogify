
import { Link } from "react-router-dom"
interface postInput {
    id: String,
    title: String,
    content: String,
    created: String,
    author: {
        name: String
    }
}
export default function BlogCard(blogInput: postInput) {
    return (
        <div className="m-4  bg-white border border-gray-200 rounded-lg shadow w-11/12">
            <div id="defaultTabContent">
                <div className="p-4 bg-white rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b  rounded-t-lg " id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li className="mt-2 me-2">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-bold text-xl text-gray-600 dark:text-gray-300">{blogInput.author.name.slice(0,1).toUpperCase()}</span>
                            </div>
                        </li>
                        <li className="me-2">
                            <div id="about-tab" data-tabs-target="#about" role="tab" aria-controls="about" aria-selected="true" className="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100">{blogInput.author.name}</div>
                        </li>
                        <li className="me-2">
                            <div id="services-tab" data-tabs-target="#services" role="tab" aria-controls="services" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100">{blogInput.created.slice(0, 10)} {blogInput.created.slice(11, 19)}</div>
                        </li>
                    </ul>
                    <div className="pt-3">
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">
                            {blogInput.title.length > 30 ? blogInput.title.slice(0, 60) + '...' : blogInput.title}</h2>
                        <p className="mb-3 text-gray-500">{blogInput.content.length > 100 ? blogInput.content.slice(0, 100) + '...' : blogInput.content}</p>
                        <Link to={`/blogSpecific/${blogInput.id}`}>
                            <div className="inline-flex items-center font-medium text-gray-500">
                                <div className="text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mr-5  dark:bg-gray-100 dark:hover:bg-gray-300 border border-gray-200 shadow-md">
                                    Read more
                                </div>
                                {Math.ceil((blogInput.title.length + blogInput.content.length) / 100)} min read
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

