import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

function ChatLayout() {

    const [messages, setMessages] = useState([]);
    const retrievedKey = localStorage.getItem('accessToken')
    const [messageData, setMessageData] = useState({
        newMessage: ""
    })

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ retrievedKey }`,
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessageData((prevData) => ({ ...prevData, [name]: value }));
      };
      
    const data = {
        "recipients": [
            {"user": "657ff73389fa054eacac57c1"},
            {"user": "657ff74089fa054eacac57c4"}
        ],
        "content": messageData.newMessage
     }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(messageData.newMessage)
        if (messageData.newMessage) {
          axios.post("https://connectus-4ev0.onrender.com/messages/create-message", data, { headers },)
            .then((response) => {
                toast.success("Message sent")
                document.getElementById("messageForm").value = ""

            })
            .catch((err) => {
              if (err.response) {
                const { data: errorData, status } = err.response;
                console.error(`Server responded with error status: ${status}`, errorData);
    
                if (errorData && errorData.message) {
                  toast.error(`Error: ${errorData.message}`);
                } else {
                  toast.error("An unexpected error occurred. Please try again later.");
                }
              } else if (err.request) {
                console.error("No response received from the server. Check your internet connection or try again later.");
                toast.error("No response received from the server. Check your internet connection or try again later.");
              } else {
                console.error("Error setting up the request:", err.message);
                toast.error("An unexpected error occurred. Please try again later.");
              }
            });
        }
      };
    
      const handleDelete = (selectedMessage) => {
        axios.delete(`https://connectus-4ev0.onrender.com/messages/${selectedMessage.id}`, { headers })
          .then(response => {
            toast.success("Message deleted successful")
            console.log('DELETE request successful:', response.data);
          })
          .catch(error => {
            console.error('DELETE request failed:', error);
          });
      }




    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('https://connectus-4ev0.onrender.com/messages/', { headers, });

            setMessages(response.data.data.messages);
        } catch (err) {
            console.log('Error:', err.message);
        }
        };
        fetchData();
    }, [setMessages]);

    return ( 
        <div className="bg-pink-50 font-nunito">
            <div className="flex">
                <Sidebar/>
                <main className="bg-white h-screen ml-2 w-full">
                    <div className="w-full ml-1 bg-white w-full">
                        {messages.map(message => { 
                            return  <div key={message._id} className="bg-pink-50 py-4 flex items-center justify-between max-w-2/3 px-6 mx-4 my-4 rounded-sm">
                                <div>
                                    <p className="text-lg pb-1">{message.content}</p> 
                                    <div className="flex ">
                                        <p className="text-xs mr-1">{message.sender.firstName}</p>
                                        <p className="text-xs">{message.sender.lastName}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(message)} className="text-orange-700 font-semibold h-8 px-4 rounded-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                  </svg>
                                </button>
                            </div>
                        })}
                        <div className="absolute items-center flex justify-between mb-2 bottom-0 bg-pink-50 w-2/3 mt-4 px-5 rounded-md">
                            <input 
                                id="messageForm"
                                 value={messageData.newMessage}
                                 onChange={handleInputChange}
                                 type="text"
                                 name="newMessage"
                                 placeholder="Type a new message here..."
                                 required
                                 className="bg-pink-50 w-full py-6 px-5 outline-none"
                                 />
                            <button onClick={handleSubmit} className="mr-3 hover:text-orange-600">Send</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
     );
}

export default ChatLayout;