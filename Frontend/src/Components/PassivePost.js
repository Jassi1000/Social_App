
import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const PassivePost = ({post}) =>{
    console.log("In the passive post : ",post)
    const [showPost,setShowPost] = useState(false);

    function isImage(url) {
         return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
    }
    
    return(
        <div>
            <div className="relative h-[300px] w-[250px] group">
                {
                    isImage(post.content) ? 
                    (
                        <img src={post.content} className="w-full h-full"></img>
                    ) : 
                    (
                        <div className="w-[250px] h-[300px]">
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

                <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto flex items-center justify-center text-white text-lg font-semibold">
                    <div className="flex items-center space-x-10">
                        {
                            post.likes.length > 0 &&
                        <div className="flex space-x-1">
                            <AiFillLike  fontSize={"1.5rem"} color="white"/>
                            <p>
                                {post.likes.length}
                            </p>
                        </div>
                        }
                        {
                            post.comments.length > 0 && 
                        <div className="flex space-x-1">
                            <FaComment fontSize={"1.3rem"} color="white"/>
                            <p className="pl-1">
                                {post.comments.length}
                            </p>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <button onClick={() => setShowPost(true)}>
                Click Me !!
            </button>

            {/* This is to show the full post */}
            {
                showPost && 
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 text-white z-50 flex items-center justify-center" >
                    <button className="text-gray-300 text-5xl fixed top-2 right-7" onClick={() => setShowPost(false)}>
                        &times;
                    </button>
                    <div className="bg-white w-1/2 h-1/2">

                    </div>
                </div>
            }
        </div>
    )
}
export default PassivePost;