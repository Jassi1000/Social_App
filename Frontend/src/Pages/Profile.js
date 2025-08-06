import React, { useEffect, useState } from "react";
import { useUserDataStore } from "../Store/userData";
import { MdGridOn } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import PassivePost from "../Components/PassivePost";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {userData,getUserData} = useUserDataStore();

  const [postsSelected,setPostSelected] = useState(true);
  const navigate = useNavigate();

  const{userPosts,getUserPosts} = useUserDataStore();

  useEffect(()=>{
    getUserData();
     getUserPosts();
    console.log("User Posts in the Profile component : ",userPosts);
  },[])

  const goToFollowers = () => {
    navigate('/Followers');
  }

  const goToFollowings = () => {
    navigate('/Followings');
  }


  //UserData is still null 
  // useEffect(()=>{
  //   if(userData === null) getUserData();
  // },[userData,getUserData])

  console.log(userData);
  if(!userData){
    return(
      <div className="flex justify-center w-[700px] min-h-screen bg-white rounded-lg shadow-lg mr-[200px]">
        Loading...
      </div>
    )
  }
  return (
    <div className="flex justify-center w-[700px] min-h-screen bg-white rounded-lg shadow-lg mr-[200px]">
      <div className="space-y-10">

        {/* This is for the Personal data */}
        <div className="flex mt-10 space-x-10">

          {/* Div for Image  */}
          <div className="w-[150px] h-[150px] bg-slate-300 rounded-full">
            <img src={userData.profilePicture} ></img>
          </div>


          {/* For the right section */}
          <div className="flex flex-col space-y-5">

            {/* This is for Username and to edit profile */}
            <div className="flex items-center space-x-10">
              <h2 className="text-2xl">{userData.username}</h2>
              <button className="bg-[#002233] text-white px-3 py-1 rounded">
                <p>Edit Profile</p>
              </button>
            </div>


            {/* This is for no of Posts,Followings,Followers */}
            <div className="flex items-center space-x-10">
              <p>{userData.posts.length} Posts</p>
              <button onClick={goToFollowers}>
                {userData.followers.length} Followers
              </button>
              <button onClick={goToFollowings}>
                {userData.following.length} Following
              </button>
            </div>


            {/* This div is for bio */}
            <div>
              <p className="text-sm text-gray-400r">{userData.bio}</p>
            </div>
          </div>
        </div>

        {/* This is to navigate to posts or saved posts */}
        <div className="flex items-center">

          {/* This is for the posts */}
          <div className="flex items-center justify-center w-1/2">
            <button>
              <MdGridOn fontSize={"1.8rem"} />
            </button>
          </div>

          {/* This is for the saved posts */}
          <div className="flex items-center justify-center w-1/2 ">
            <button>
              <MdSaveAlt  fontSize={"1.8rem"}/>
            </button>
          </div>

        </div>

        {/* This is to show posts or saved posts */}

        <div className="grid grid-cols-2 gap-3 pb-10">
          {
            postsSelected ? 
            (userPosts.length > 0 && 
            (
              userPosts.map((post) => {
                return (<PassivePost key={post._id} post = {post}/>)
              })
            )) 
             : 
            (
              userData.savedPosts.map((postId ,index) => (
                <PassivePost key={index} postId = {postId}/>
              ))
            )
          }
        </div>


      </div>
    </div>
  );
}   

export default Profile;


// Console.log(...) returns the undefined