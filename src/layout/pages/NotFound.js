import { Link } from "react-router-dom";

function NotFound() {
    return ( 
        <div className="h-screen flex flex-col items-center text-gray-500 max-w-3xl mx-auto mt-32 text-center">
        <h1 className="text-5xl leading-tight">Sorry, the page you were looking for was not found.</h1>
        <p className="text-xl py-5 leading-loose max-w-2xl">Check the link very well if there's a typo.</p>
        <Link to="/" className="bg-orange-500 text-white mt-8 px-24 py-1 rounded-sm ml-8">Return to Home</Link>
    </div>
     );
}

export default NotFound;