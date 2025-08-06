import React ,{ useCallback, useEffect, useState}from "react";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useInteractionStore } from "../Store/interaction";
import { useUserDataStore } from "../Store/userData";
import { FaComment } from "react-icons/fa";
import { useDataStore } from "../Store/getData";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../lib/axios';

const Post = ({post}) => {

    const {likePost,commentPost} = useInteractionStore();
    const {userData} = useUserDataStore();
    const {setOtherUserId} = useDataStore();
    // const getCommentsOnPost = useDataStore((state) => state.getCommentsOnPost);
    // const commentsOnPost = useDataStore((state) => state.CommentsOnPost[post._id]);
    const [commentsOnPost,setCommentsOnPost] = useState();


    const [fullCaption, setFullCaption] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState(false);
    const navigate = useNavigate();

    const [mycomment,setMyComment] = useState([]);
    const [commentToSend,setCommentToSend] = useState();

    useEffect(() => {
        // Check if the post is liked by the user
        console.log("Hun chalea ehe ")
        if (userData && userData.likes) {
            setIsLiked(userData.likes.includes(post._id));
        }
        
    }, [userData, post._id]);

    //WE have to find out why it is not working with zustand
    const getCommentsOnPost = async (postId) => {
            try {
                const response = await axiosInstance.get(`/getData/getCommentsOnPost/${postId}`);
                console.log("Comments fetched successfully:", response);
                // set((state)=>({ CommentsOnPost : {
                //     ...state.CommentsOnPost,
                //     [postId] : response.data.comments
                // } }));
                // console.log("Comments for post:", postId, "are:", get().CommentsOnPost[postId]);
                setCommentsOnPost(response.data.comments);
            } catch (error) {
                console.error("Get Comments Error:", error);
            }
        }

    useEffect(()=>{
        if(comments && !commentsOnPost){
            getCommentsOnPost(post._id);
        }
    },[comments])

    // Function to handle like action
    const likeHandler = async() => {
        setIsLiked(!isLiked);
        // Here you would typically also send a request to the server to update the like status
        likePost(post._id);
        console.log("Post liked:", post._id, "Status:", !isLiked);
    };

    // Function to handle comment action
    //The functions donot work together because when you call the setcomments 
    //it works internally and it doesnot update it renders but before that the 
    //getCommentsonPost is called which interrupts it
    const commentHandler =  () => {
        setComments(!comments);
    }

    function isImage(url) {
         return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
    }


    const sendCommentHandler = async() => {
        setMyComment((prev) => [...prev,commentToSend]);
        await commentPost(post._id,commentToSend);
        setCommentToSend("");
    }

    const otherUserHandleFromPost = () => {
        setOtherUserId(post.userid._id);
        // navigate('/OtherUserProfile/:otherUserid'); --> This is needed when you want to search the user
        navigate('/OtherUserProfile');
    }

    const otherUserHandleFromComment = (otherUserID) => {
        setOtherUserId(otherUserID);
        // navigate('/OtherUserProfile/:otherUserid'); --> This is needed when you want to search the user
        navigate('/OtherUserProfile');
    }

  return (
    <div className="flex flex-col items-center justify-center w-full  mb-4 p-4 border-b-4">

        {/* This is for Posted By */}
        <div className="flex items-center w-full mb-2 space-x-2">
            <div className="w-[50px] h-[50px] rounded-full ">
                <img src={post.userid.profilePicture} ></img>
            </div>
            <button className="font-bold text-sm" onClick={otherUserHandleFromPost}>{post.userid.username}</button>
        </div>

        {console.log("Rendering Post:", post)}
            {
                    isImage(post.content) ? 

                    //This is for the image Post
                    (
                        <img src={post.content} className="w-full h-full rounded-lg"></img>
                    ) : 

                    //This for the video Post
                    (
                        <div className="w-full h-full">
                        <video
                            controls
                            autoPlay
                            muted
                            className="w-full h-full object-cover"
                        >
                            <source src={post.content} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        </div>
                    )
            }

            {/* This is for the Caption */}
            <p className="text-sm mt-2 w-full">
                {
                    fullCaption ? post.caption : post.caption.length > 100 ? post.caption.slice(0, 100) + "..." : post.caption
                }
                <button 
                    className="text-blue-500 ml-2"
                    onClick={() => setFullCaption(!fullCaption)}
                    >
                    {fullCaption ? "Show Less" : "Show More"}
                </button>
            </p>

            {/* This is the like */}
            <div className="flex items-center space-x-4 w-full mt-2">
                <button onClick={likeHandler}>
                    {
                    isLiked ? 
                    (<FcLike fontSize={"1.8rem"} />)
                     : 
                    (<FcLikePlaceholder fontSize={"1.8rem"}/>)
                    }
                </button>
                <button type="button" onClick={commentHandler}>
                    <FaComment fontSize={"1.8rem"} color="darkblue"/>
                </button>
            </div>
            <div className="w-full mt-4 flex flex-col ">
                { comments &&
                (
                        commentsOnPost ? (
                            <div>
                                <p>Comments...</p>
                                {
                                    mycomment.length > 0 &&
                                    mycomment.map((comment) => (
                                        //This is for the comments send
                                        <div className="p-2 flex border-b-2 mb-2">
                                            <div className="w-[50px] h-[50px] rounded-full ">
                                                <img src={userData.profilePicture} ></img>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{userData.username}</p>
                                                <p>{comment}</p>
                                            </div>
                                        </div>
                                ))

                    
                                    
                                }
                                {
                                commentsOnPost.map((comment) => (
                                    <div key={comment._id} className="p-2 flex border-b-2 mb-2">
                                        <div className="w-[50px] h-[50px] rounded-full ">
                                            <img src={comment.commentBy.profilePicture} ></img>
                                        </div>
                                        <div>
                                            <button className="font-bold text-sm" onClick={()=>otherUserHandleFromComment(comment.commentBy._id)}>{comment.commentBy.username}</button>
                                            <p>{comment.content}</p>
                                        </div>
                                    </div>
                                ))
                                }

                                {/* This is to send the the comment  */}
                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-[20px] h-[20px] rounded-full ">
                                            <img src={userData.profilePicture} ></img>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-xs">{userData.username}</p>
                                        </div>
                                    </div>
                                    <textarea placeholder="Add a comment..." value={commentToSend} onChange={(e)=>{setCommentToSend(e.target.value)}}
                                        className="w-full min-h-[32px] resize-none overflow-hidden bg-gray-50 text-sm text-gray-800 
                                                 placeholder-gray-400 px-3 py-2 rounded-md border border-transparent 
                                                   focus:outline-none focus:border-gray-300 transition-colors"
                                    ></textarea>
                                    <div className="w-full flex items-center justify-end">
                                        <button className="text-blue-600 font-bold" onClick={sendCommentHandler}>send</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )
                )
                }
            </div>
    </div>
  );
}   

export default Post;