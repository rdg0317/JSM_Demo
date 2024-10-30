import { useParams } from "react-router-dom"
import PostForm from "../../components/forms/PostForm"
import { useGetPostById } from "../../lib/react-query/queriesAndMutations"
import Loader from "../../components/shared/Loader"

const EditPost = () => {
  const {id: postId} = useParams()
  const {data: post, isPending} = useGetPostById(postId || '')
  if(isPending) return <Loader/>

  return (
    <div className="flex flex-1">
    <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <img
            src='/assets/icons/add-post.svg'
            width={30}
            height={30}
            alt='edit post'
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action = 'UPDATE' post={post}/>
    </div>
    </div>
  )
}

export default EditPost
