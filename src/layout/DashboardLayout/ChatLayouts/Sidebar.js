import { Link } from "react-router-dom";

function Sidebar() {
    return ( 
        <div className="bg-white h-screen text-xs text-gray-700 flex flex-col items-start w-56 py-4 px-1">
            <Link to="chat" className="bg-pink-50 w-full text-left mt-6 mb-1.5 px-5 rounded-sm py-1 hover:bg-gray-200">#general</Link>
        </div>
     );
}

export default Sidebar;