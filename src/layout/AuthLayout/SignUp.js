import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

    if (!data.firstName) {
      proceed = false;
      errorMessage += "first name, ";
    }
    if (!data.lastName) {
      proceed = false;
      errorMessage += "last name, ";
    }
    if (!data.phone) {
      proceed = false;
      errorMessage += "phone number, ";
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      axios.post("https://connectus-4ev0.onrender.com/auth/signup", data)
        .then((response) => {
          console.log(response.data, 'response.data');
          toast.success("Successfully registered");
          navigate("/login");
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
    <>
      <div className="flex flex-col justify-center items-center h-80 w-72 mx-auto mt-28 md:w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">Account Set-up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap md:space-x-9">
            <input
              value={data.firstName}
              onChange={handleInputChange}
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First name"
              className="border border-blue-400 w-full py-2 md:w-[180px] mt-4 px-5 rounded-md outline-none"
            />
            <input
              value={data.lastName}
              onChange={handleInputChange}
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last name"
              className="border border-blue-400 w-full py-2 md:w-[180px] mt-4 px-5 rounded-md outline-none"
            />
          </div>

          <input
            value={data.phone}
            onChange={handleInputChange}
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="border border-blue-400 w-full py-2 mt-4 px-5 rounded-md outline-none"
          />
          <input
            value={data.email}
            onChange={handleInputChange}
            id="email"
            type="text"
            name="email"
            placeholder="Enter email address"
            className="border border-blue-400 w-full py-2 mt-4 px-5 rounded-md outline-none"
          />
          <input
            value={data.password}
            onChange={handleInputChange}
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            className="border border-blue-400 w-full py-2 mt-4 px-5 rounded-md outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 mt-4 px-5 rounded-md bg-orange-500 text-white font-bold hover:bg-white hover:border hover:border-black hover:text-black"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span>
            <Link
              to="/Login"
              className="text-start text-blue-500 hover:underline"
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default SignUp;
