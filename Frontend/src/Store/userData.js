import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useUserDataStore = create((set,get) => ({
    userData: null,
    userPosts: [],
    getUserData: async () => {
        try {
            const response = await axiosInstance.get('/getData/getUserDetails');
            set({ userData: response.data.user });
            console.log("User data fetched successfully:",get().userData );
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },
    getUserPosts: async () => {
        try{
            const response = await axiosInstance.get('/getData/getUserPosts');
            set({userPosts:response.data.posts});
            console.log("Here are the user Posts : ",response.data.posts)
            console.log("User Posts response are : ",response);
        }
        catch(error) {
            console.error("Error fetching the user posts: ",error);
        }
    }

}));