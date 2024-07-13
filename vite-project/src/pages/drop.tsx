
import { useNavigate } from "react-router-dom";
import { GetQuote, quote } from "../hooks/getQuote";

export default function Drop() {
    const navigate = useNavigate()
    const handleSignin = () => {
        navigate('/signin')
        console.log('Logged out');
    };
    const handleSignup = () => {
        navigate('/signup')
        console.log('Logged out');
    };
    const quote: quote[] = GetQuote();
    return (
        <div className="font-serif">
            <div className="flex justify-between border-b border-collapse bg-gray-200">
                <div className="p-4 ml-6 flex justify-center text-5xl font-bold ">
                    Blogify
                </div>
                <div>
                    <div className="flex p-3 mx-7">
                        <div className=" mx-2 mt-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm">
                            <button onClick={handleSignin} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-300">
                                Sign in
                            </button>
                        </div>
                        <div className=" mx-2 mt-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm">
                            <button onClick={handleSignup} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-300">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col min-w-full min-h-screen object-cover bg-[url('/pexels-photo-743986.webp')] w-full h-[250px] bg-cover bg-center bg-no-repeat md:h-[350px]">
                <div className="flex flex-col justify-center container text-center">
                    <h1 className="p-6 flex justify-center  text-6xl font-bold">
                        Stories, Ideas and Experiences
                    </h1>
                    <div className="mt-20 flex flex-row justify-center">
                        <div className="p-4 max-w-lg ">
                            <div className="text-4xl font-bold mb-4">
                                {quote[0].q}
                            </div>
                            <div className="text-xl font-semibold">
                                - {quote[0].a}
                            </div>
                        </div>
                        <div className="hidden lg:block text-2xl max-w-2xl p-10">
                            Join our community of passionate writers and readers today. Start writing your own blog posts,
                            discover content from other creators, and engage with a like-minded community.
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
};


