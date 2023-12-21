import { useEffect, useState } from "react";
import axios from 'axios';
import CreateNewsModal from "../CreateNewsModal";

function News(){
  const [responseData, setResponseData] = useState([]);
  const retrievedKey = localStorage.getItem('accessToken')


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ retrievedKey }`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://connectus-4ev0.onrender.com/news/all?page=1&limit=6&category=Holiday', { headers, });

        setResponseData(response.data.data.docs);
      } catch (err) {
        console.log('Error:', err.message);
      }
    };
    fetchData();
  }, [setResponseData]);

  return (
    <div>
      {responseData ? (
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl text-center mt-6 ml-6 mr-16 font-semibold">Announcements</h1>
            <CreateNewsModal />
          </div>
          {responseData.map(eachNews => {
            return <div key={eachNews._id} className="bg-pink-50 py-2 px-3 mx-4 my-8 rounded-sm">
              <h2 className="text-2xl mt-2 pb-2">{eachNews.title}</h2>
              <p className="text-lg pb-2">{eachNews.content}</p>
              <div className="flex">
                <p className="mr-12">Category: {eachNews.category}</p>
                <p>Publish Date: {new Date(eachNews.publishDate).toLocaleString()}</p>
              </div>
            </div>
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default News;