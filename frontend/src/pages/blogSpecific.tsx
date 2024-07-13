import SpecificCard from "../components/SpecificCard"
import Appbar from "../components/appbar"
import { useParams } from "react-router-dom"
import { getSpecificBlogs } from "../hooks/getSpecificBlogs";
import Loader from "../components/loader";

export default function BlogSpecific() {
  const { id } = useParams();
  const { loading, blog } = getSpecificBlogs(id == undefined ? "1" : id)
  if (loading) {
    return (
      <Loader></Loader>
    )
  }
  return (
    <div>
      <Appbar></Appbar>
      <SpecificCard blog={blog} ></SpecificCard>
    </div>
  )
}
