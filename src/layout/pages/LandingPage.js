import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="h-screen bg-pink-50 flex flex-col items-center mx-auto text-center">
            <h1 className="text-5xl leading-tight mt-28">Making Communuication & Connection Easy</h1>
            <p className="text-xl py-5 leading-loose max-w-2xl">Welcome to ConnectUs, the sophisticated communication app meticulously crafted for the seamless connectivity of our company. Designed to enhance collaboration and foster effective communication, ConnectUs brings your teams closer, facilitating real-time conversations, file sharing, and group discussions.</p>
            <p className="text-2xl text-orange-600">To continue using the app:</p>
            <div  className='mt-6 text-base'>
                <Link to="/SignUp" className="bg-orange-500 text-white px-7 py-1 rounded-sm mr-7">Register</Link>
             or
                <Link to="/login" className="bg-orange-500 text-white px-8 py-1 rounded-sm ml-8">Login</Link>
            </div>
        </div>
    )
};

export default Home;