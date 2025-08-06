import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useDataStore = create((set,get) => ({
    dataLoading: true,
    otherUserData:null,
    otherUserId : null,
    posts: [],
    following:[],
    followers:[],

    // CommentsOnPost: {},
    getPosts: async () => {
        set({dataLoading: true});
        try {
            const response = await axiosInstance.get('/getData/getPosts');
            console.log("Response fetched successfully:", response);
            if (response.data.posts.length === 0) {
                console.log("No posts available.");
            }
            set({ posts: response.data.posts });
        } catch (error) {
            console.error("Get Posts Error:", error);
        } finally {
            set({dataLoading: false});
        }
    },

    // The problem we are getting with this --> it re-renders every post if we call it for one Post
    // and Another problem is it does the re-render and it is like refreshes the page

    // getCommentsOnPost: async (postId) => {
    //     set({dataLoading: true});
    //     try {
    //         const response = await axiosInstance.get(`/getData/getCommentsOnPost/${postId}`);
    //         console.log("Comments fetched successfully:", response);
    //         // set((state)=>({ CommentsOnPost : {
    //         //     ...state.CommentsOnPost,
    //         //     [postId] : response.data.comments
    //         // } }));
    //         // console.log("Comments for post:", postId, "are:", get().CommentsOnPost[postId]);
    //         return response.data.comments;
    //     } catch (error) {
    //         console.error("Get Comments Error:", error);
    //     } finally {
    //         set({dataLoading: false});
    //     }
    // },
    
    setOtherUserId: (otherUserid)=>{
        console.log("Lets see --> ",otherUserid);
        set({otherUserId:otherUserid});
        console.log("Other user id is set : ",get().otherUserId);
    },

    getOtherUserDetails: async()=>{
        set({dataLoading: true});
        try {
            const otherUserId = get().otherUserId;
            const response = await axiosInstance.get(`/getData/getOtherUserDetails/${otherUserId}`);
            console.log("Comments fetched successfully:", response);
            set({otherUserData:response.data});

        } catch (error) {
            console.error("Get Comments Error:", error);
        } finally {
            set({dataLoading: false});
        }
    },

    getFollowers : async() => {
        try{
            const response = await axiosInstance.get("/getData/getFollowers");
            console.log(response.data.followers);
            set({followers:response.data.followers});
        }
        catch(error){
            console.error("Get Follwers Error:", error);
        }
    },

    getFollowing : async() => {
        try{
            const response = await axiosInstance.get("/getData/getFollowing");
            console.log(response.data.following);
            set({following:response.data.following});
        }
        catch(error){
            console.error("Get Follwers Error:", error);
        }
    }

}));