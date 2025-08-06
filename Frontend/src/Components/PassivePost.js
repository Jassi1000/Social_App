import React, { useEffect } from "react";

const PassivePost = ({post}) =>{
    console.log("In the passive post : ",post)

    function isImage(url) {
         return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
    }
    
    return(
        <div>
            <div className="h-[300px] w-[250px]">
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
            </div>
        </div>
    )
}
export default PassivePost;