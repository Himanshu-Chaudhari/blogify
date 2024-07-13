
interface postInterface {
    title: String,
    content: String,
    author: {
        name: String
    },
    id: String
}
export default function SpecificCard({ blog }: { blog: postInterface }) {
    return (
        <div className=" m-4 mr-0  bg-white border border-gray-200 rounded-lg shadow">
            <div id="defaultTabContent">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 p-4 bg-white rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
                        <div>
                        </div>
                        <div className="pt-3">
                            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">
                                {blog.title}</h2>
                            <p className="mb-3 text-gray-500">{blog.content}</p>
                        </div>
                    </div>
                    <div className="col-span-4 p-3">
                        <div className="flex flex-wrap">
                            <div id="about-tab" data-tabs-target="#about" role="tab" aria-controls="about" aria-selected="true" className="inline-block text-xl p-2 font-semibold tracking-tight text-gray-900">Author </div>
                        </div>
                        <div className="mt-2 flex me-2">
                            <div className="flex justify-center">
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">{blog.author.name.slice(0, 1).toUpperCase()}</span>
                                </div>
                                <div className="text-3xl ml-3 font-extrabold tracking-tight text-gray-900">{blog.author.name}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

