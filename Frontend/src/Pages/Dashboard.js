import React, { memo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDataStore } from "../Store/getData";
import Post from "../Components/Post";
import { useUserDataStore } from "../Store/userData";
import Loading from "../Components/Loading";

const Dashboard = () => {

  const {posts,dataLoading,getPosts} = useDataStore();
  const { getUserData } = useUserDataStore();
  //This is used when you have large list of data and if something is changed for one element
  //of list then all the elements will be re-render , so to prevent this we use the memo
  const MemoizedPost = memo(Post);

  async function fetchPosts() {
    await getUserData();
    await getPosts();
  }


  // This effect can be used to fetch data or perform side effects
  useEffect(() => {
    console.log("Dashboard ala chalea")
    fetchPosts();
  }, [getPosts]);

  if (dataLoading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background SVG */}
      {/* <img
        src="./assets/dashboard_background.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      /> */}
        <Loading />
      </div>
    )
  }
  
  return ( 
    <div className=" flex items-center justify-center w-[500px] min-h-screen bg-white rounded-lg shadow-lg ">
      { posts.length > 0 ? (
        <div className="w-full p-4 will-change-transform">
          {posts.map((post) => (
            <MemoizedPost key={post._id} post = {post} postId = {post._id}/>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No posts available.</div>
      )}
    </div>
  );
}

export default Dashboard;