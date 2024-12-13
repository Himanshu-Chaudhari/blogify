
// import { useNavigate } from "react-router-dom";
// import { GetQuote, quote } from "../hooks/getQuote";

// export default function Drop() {
//     const navigate = useNavigate()
//     const handleSignin = () => {
//         navigate('/signin')
//         console.log('Logged out');
//     };
//     const handleSignup = () => {
//         navigate('/signup')
//         console.log('Logged out');
//     };
//     const quote: quote[] = GetQuote();
//     return (
//         <div className="font-serif">
//             <div className="flex justify-between border-b border-collapse bg-gray-200">
//                 <div className="p-4 ml-6 flex justify-center text-5xl font-bold ">
//                     Blogify
//                 </div>
//                 <div>
//                     <div className="flex p-3 mx-7">
//                         <div className=" mx-2 mt-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm">
//                             <button onClick={handleSignin} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-300">
//                                 Sign in
//                             </button>
//                         </div>
//                         <div className=" mx-2 mt-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm">
//                             <button onClick={handleSignup} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-300">
//                                 Sign up
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex flex-col min-w-full min-h-screen object-cover bg-[url('/pexels-photo-743986.webp')] w-full h-[250px] bg-cover bg-center bg-no-repeat md:h-[350px]">
//                 <div className="flex flex-col justify-center container text-center">
//                     <h1 className="p-6 flex justify-center text-5xl font-bold">
//                         Stories, Ideas and Experiences
//                     </h1>
//                     <div className="mt-20 flex flex-row justify-center">
//                         <div className="p-4 max-w-lg ">
//                             <div className="text-2xl font-bold mb-4">
//                                 {quote[0].q}
//                             </div>
//                             <div className="text-xl font-semibold">
//                                 - {quote[0].a}
//                             </div>
//                         </div>
//                         <div className="hidden lg:block text-2xl max-w-2xl p-10">
//                             Join our community of passionate writers and readers today. Start writing your own blog posts,
//                             discover content from other creators, and engage with a like-minded community.
//                             <br /><br />
//                         <button onClick={()=>navigate('/signup')}>Get Started &rArr;</button>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//         </div>
//     );
// };import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetQuote, quote } from "../hooks/getQuote";

export default function Drop() {
    const navigate = useNavigate();
    const handleSignin = () => {
        navigate('/signin');
    };
    const handleSignup = () => {
        navigate('/signup');
    };
    const quote: quote[] = GetQuote();

    return (
        <div className="font-serif bg-gray-50 text-gray-800  flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-3 bg-white shadow-md">
                <div className="text-3xl font-bold text-gray-900">
                    Blogify
                </div>
                <div className="flex space-x-6">
                    <button
                        onClick={handleSignin}
                        className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={handleSignup}
                        className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                    >
                        Sign up
                    </button>
                </div>
            </header>

            {/* Main Section */}
            <main className="flex-1">
                {/* Hero Section */}
                <section className="flex items-center justify-center text-center px-8 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">

                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Welcome to Blogify
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-10">
                            Discover stories, ideas, and experiences <br></br> shared by our passionate community.
                        </p>
                        {/* Quote Section */}
                        <section className="flex items-center justify-center px-8 min-h-96">
                            <div className="max-w-4xl mx-auto text-center">
                                <blockquote className="text-3xl italic text-gray-700 mb-6">
                                    "{quote[0]?.q}"
                                </blockquote>
                                <p className="text-xl font-semibold text-gray-500">
                                    - {quote[0]?.a}
                                </p>
                            </div>
                        </section>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-3 bg-gray-900 text-white text-lg rounded-md shadow-md hover:bg-gray-800 transition"
                        >
                            Get Started &rarr;
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
