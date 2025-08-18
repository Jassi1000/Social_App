import { useChatStore } from "../../Store/chat"
import { useMediaSoupStore } from "../../Store/mediaSoup";


export const createSendTransport = async (chatId) => {
    const socket = useChatStore.getState().socket;
    const device = useMediaSoupStore.getState().device;

    return new Promise ((resolve,reject)=>{
        socket.emit("mediaSoup:createTransport",{chatId,direction : 'send'},async(transportOptions)=>{
            try{
                const sendTransport = await device.createSendTransport(transportOptions);

                //now we are connecting with the server using transport.on (connect)
                //In which we are socket.emit(connect) means it return callback to transport that we connected to server
                sendTransport.on("connect",({dtlsParameters},callback,errback)=>{
                    socket.emit("mediaSoup:connectTransport",{
                        dtlsParameters,
                        chatId,
                        transportId:sendTransport.id
                    },callback)
                })

                //This to enable the produce
                sendTransport.on("produce",({dtlsParameters,kind,rtpParameters},callback,errback)=>{
                    socket.emit("mediaSoup:produce",{
                        dtlsParameters,
                        kind,
                        rtpParameters,
                        chatId,
                        transportId:sendTransport.id
                    },({id})=>{
                        callback({id});
                    })
                });

                sendTransport.on("connectionstatechange", (state) => {
                    console.log("Send transport state:", state);
                });

                useMediaSoupStore.getState().setSendTransport(sendTransport);
                resolve(sendTransport);
            }
            catch(error){
                console.error("Error creating send transport:", error);
                reject(error);
            }
        })
    })
}