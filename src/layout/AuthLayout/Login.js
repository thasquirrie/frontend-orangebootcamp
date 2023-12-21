import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const navigate = useNavigate();

  const validate = () => {
    let proceed = true;
    let errorMessage = "Please enter your ";

    if (!data.email) {
      proceed = false;
      errorMessage += "email address, ";
    }
    if (!data.password) {
      proceed = false;
      errorMessage += "password, ";
    }

    if (!proceed) {
      toast.warning(errorMessage.slice(0, -2));
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0]+\.[A-Za-z]+$/.test(data.email)) {
      proceed = false;
      toast.warning("Please enter a valid email address!");
    }

    return proceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios.post("https://connectus-4ev0.onrender.com/auth/login", data)
        .then((response) => {
          localStorage.setItem('userData', JSON.stringify(response.data.data.user));
          localStorage.setItem('accessToken', response.data.data.accessToken);
          toast.success("Welcome back");
          navigate("/dashboard");
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
      <div className="flex flex-col justify-center items-center mx-auto h-80 w-72 md:w-[400px]">
        <h1 className="text-3xl font-bold text-center ">Welcome Back</h1>
        <div className='w-8 bg-black h-[3px] mb-6'></div>
        <form onSubmit={handleSubmit}>
          <input
            value={data.email}
            onChange={handleInputChange}
            id="email"
            type="email"
            name="email"
            placeholder="Enter email address"
            required
            className="border border-blue-400 w-full py-2  mt-4 px-5 rounded-md outline-none"
          />
          <input
            value={data.password}
            onChange={handleInputChange}
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="border border-blue-400 w-full py-2 mt-4 px-5 rounded-md outline-none"
          />

          <button
            type="submit"
            className=" w-full py-2  mt-4 px-5 rounded-md bg-orange-500 text-white font-bold hover:bg-white hover:border hover:border-black hover:text-black"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm flex space-x-14 md:space-x-60">
          <Link to='/ResetPassword' className='text-blue-500 hover:underline'>Forgot password?</Link>
          <Link to='/SignUp' className='text-blue-500 hover:underline'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login