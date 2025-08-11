import {create} from 'zustand';
import { io } from 'socket.io-client';
import { axiosInstance } from '../lib/axios';

export const useChatStore = create((set,get)=>({
    socket:null,

    connectSocket : () => {
        if(get().socket?.connected) return ;

        const socket = io("http://localhost:4000",{
            withCredentials:true
        });

        set({socket});
        console.log("Here is the connected Socket --> ",get().socket);
    }
}))