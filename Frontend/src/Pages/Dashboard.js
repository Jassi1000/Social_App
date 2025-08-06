import React, { memo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDataStore } from "../Store/getData";
import Post from "../Components/Post";
import { useUserDataStore } from "../Store/userData";

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
    return <div className="flex items-center justify-center w-full min-h-screen">Loading...</div>;
  }
  
  return ( 
    <div className=" flex items-center justify-center w-[500px] min-h-screen bg-white rounded-lg shadow-lg mr-[200px]">
      { posts.length > 0 ? (
        <div className="w-full p-4">
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