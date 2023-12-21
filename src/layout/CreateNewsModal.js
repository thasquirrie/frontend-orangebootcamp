import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


function CreateNewsModal() {
    const [show, setShow] = useState(false);
    const [newsData, setNewsData] = useState({
      title: "",
      content: "",
      category: "Holiday"
    })
    const retrievedKey = localStorage.getItem('accessToken')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ retrievedKey }`,
    };
  
    const handleShow = () => {
      if(!show) {
        document.getElementById('modal').classList.remove("hidden")
        setShow(prev => !prev)
      } else {
        document.getElementById('modal').classList.add("hidden")
      }
  }
    const handleClose = () => {
      if(show) {
        document.getElementById('modal').classList.add("hidden")
        setShow(prev => !prev)
      } else {
        document.getElementById('modal').classList.remove("hidden")
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewsData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      console.log(newsData)
      if (newsData.title && newsData.content) {
        axios.post("https://connectus-4ev0.onrender.com/news", newsData, { headers },)
          .then((response) => {
              toast.success("News created successfully")
              setShow(prev => !prev)
              document.getElementById('modal').classList.add("hidden")
              setNewsData({
                title: "",
                content: ""
          })
              console.log("Response", response.data)
  
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
  
    return (
      <div>
        <button className="hover:bg-orange-300 mt-7 text-lg text-orange-500 hover:text-black hover:font-light font-semibold px-4 py-1.5 rounded-sm" onClick={handleShow}>
          Create News
        </button>
  
        <div className="bg-white rounded-lg border absolute hidden top-4 mx-auto w-2/3 p-3" id="modal">
          <h2 className="text-3xl py-5 pl-4">Create News</h2>
          <div>
              <input
                  value={newsData.title}
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  className="border-b border-orange-600 w-full py-1  mt-4 px-5 outline-none"
                />
                <input
                  value={newsData.content}
                  onChange={handleInputChange}
                  type="text"
                  name="content"
                  placeholder="Description"
                  required
                  className="border-b border-orange-600 w-full py-1 mt-12 px-5 outline-none"
                />
                <input
                  value={newsData.category}
                  type="text"
                  name="category"
                  placeholder="Category (Holiday)"
                  required
                  className="border-b border-orange-600 w-full py-1 mt-12 px-5 outline-none"
                />
          </div>
          <div className="mt-12 text-right">
            <button className="bg-gray-200 hover:bg-gray-100 py-3 px-6 rounded-sm mx-4" onClick={handleClose}>
              Close
            </button>
            <button className="bg-orange-500 hover:bg-orange-400 text-white py-3 px-6 rounded-sm mx-4" onClick={handleSubmit}>
              Create News
            </button>
          </div>
        </div>
      </div>
    );
  }

export default CreateNewsModal;