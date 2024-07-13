import { useRecoilValue } from "recoil"
import { userName } from "../App"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Appbar() {
    const user = useRecoilValue(userName)
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate()
    const handleAvatarClick = () => {
        setShowLogout(!showLogout);
    };
    const handleLogout = () => {
        navigate('/')
        localStorage.removeItem('token')
    };
    const handleWriteABlog = () => {
        navigate('/writeABlog')
    };
    const handleMyBlogs = () => {
        navigate('/blogs/myBlogs')
    };
    return (
        <div className="flex mx-7 justify-between p-3 border-b border-collapse">
            <div onClick={() => {
                navigate("/blogs")
            }} className="cursor-pointer font-extrabold text-3xl">
                Blogify
            </div>
            <div>
                <div className="flex">
                    <div className=" mx-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm">
                        <button onClick={handleWriteABlog} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            Write A Blog
                        </button>
                    </div>
                    <div className=" mx-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm">
                        <button onClick={handleMyBlogs} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            My Blogs
                        </button>
                    </div>
                    <div className=" mx-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm">
                        <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            Logout
                        </button>
                    </div>
                    <div onClick={handleAvatarClick} className="mt-2 me-2">
                        <div className="cursor-pointer relative inline-flex items-center justify-center w-10 h-10      overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className=" font-medium text-gray-600 dark:text-gray-300">{user.slice(0, 1).toUpperCase()}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
