import { Models } from "appwrite"
import { useDeleteSavedPosts, useGetCurrentUser, useLikePosts, useSavePosts } from "../../lib/react-query/queriesAndMutations"
import React, { useEffect, useState } from "react"
import { checkIsLiked } from "../../lib/utils"
import Loader from "./Loader"

type postStatsProps = {
    post?: Models.Document,
    userId: string
}
const PostStats = ({post, userId}:postStatsProps) => {
    const likesList = post?.likes.map((user: Models.Document)=> user.$id)
    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false)
    const {mutate: likePost} = useLikePosts()
    const {mutate: savePost, isPending: isSavingPost} = useSavePosts()
    const {mutate: deleteSavedPost, isPending: isDeletingSaved} = useDeleteSavedPosts()
    const {data:currentUser} = useGetCurrentUser()

    const savedPostRecord = currentUser?.saves.find((record: Models.Document) => record.post.$id === post?.$id )

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let newLikes = [...likes]
        const hasLiked = newLikes.includes(userId)
        if(hasLiked) {
            newLikes = newLikes.filter( (id:string) => id != userId)
        } 
        else {
            newLikes.push(userId)
        }
        setLikes(newLikes)
        likePost({ postId: post.$id, likesArray: newLikes})
    }
    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation()        
        if(savedPostRecord) {
            setIsSaved(false)
            deleteSavedPost(savedPostRecord.$id)
        }
        else {
            setIsSaved(true)
            savePost({postId: post?.$id || '', userId})
        }
    }
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img 
        src={checkIsLiked(likes, userId)
            ? "../assets/icons/liked.svg"
            : "../assets/icons/like.svg"}
        alt="like" 
        width={20}
        onClick = {handleLikePost}
        className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? <Loader/>:
        <img 
        src={isSaved
            ? "../assets/icons/saved.svg"
            : "../assets/icons/save.svg"}
        alt="save" 
        width={20}
        onClick = {handleSavePost}
        className="cursor-pointer"
        />
        }
      </div>
    </div>
  )
}

export default PostStats
