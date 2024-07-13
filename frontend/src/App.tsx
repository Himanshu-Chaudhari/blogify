import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import BlogSpecific from './pages/blogSpecific'
import Blogs from './pages/blogs'
import CreateBlog from './pages/createBlog'
import MyBlogs from './pages/myBlogs'
import { RecoilRoot , atom } from 'recoil'
import Drop from './pages/drop'
export const userName = atom<string>({
  key: 'user',
  default: "himanshu",
});

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Drop />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogSpecific/:id" element={<BlogSpecific/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/writeABlog" element={<CreateBlog/>} />
            <Route path="/blogs/myBlogs" element={<MyBlogs/>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App