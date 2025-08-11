import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDataStore } from "../Store/getData";
import Post from "../Components/Post";
import { useUserDataStore } from "../Store/userData";
import Loading from "../Components/Loading";
import Stories from "../Components/Stories";

const Dashboard = () => {

  const {posts,stories,dataLoading,getPosts,getStories} = useDataStore();
  const { getUserData } = useUserDataStore();
  const [fetched,setFetched] = useState(false);
  //This is used when you have large list of data and if something is changed for one element
  //of list then all the elements will be re-render , so to prevent this we use the memo
  const MemoizedPost = memo(Post);

  async function fetchPosts() {
    await getUserData();
    await getPosts();
    await getStories();
    setFetched(true);
  }


  // This effect can be used to fetch data or perform side effects
  useEffect(() => {
    console.log("Dashboard ala chalea")
    fetchPosts();
  }, []);

//   useEffect(() => {
//   const handleScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
//       fetchPosts();
//     }
//   };

//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, []);

  if (dataLoading || !fetched) {
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
    <div className=" flex flex-col items-center justify-center w-[500px] min-h-screen bg-white rounded-lg shadow-lg ">
      <Stories stories = {stories}/>
      { posts.length > 0 ? (
        //pt-0 is not 
        <div className="w-full p-4 pt-0 will-change-transform"> 
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