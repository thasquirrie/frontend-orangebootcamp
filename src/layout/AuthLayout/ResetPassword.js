import { Link } from 'react-router-dom'

function ResetPassword() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 mx-auto h-80 w-72 ">
        <h1 className="text-3xl font-bold text-center mb-8">Forgot Password</h1>
        <form>
          <input
            type="text"
            name="fullName"
            placeholder="Enter fullname"
            required
            className="border border-blue-400 w-full py-2  md:w-96 mt-4 px-10 rounded-md outline-none"
          />
          
          <input
            type="password"
            name="password"
            placeholder="Enter New password"
            required
            className="border border-blue-400 w-full py-2 md:w-96 mt-4 px-10 rounded-md outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New password"
            required
            className="border border-blue-400 w-full py-2 md:w-96 mt-4 px-10 rounded-md outline-none"
          />
          <button
            type="submit"
            className=" w-full py-2 md:w-96 mt-4 px-10 rounded-md bg-orange-500 text-white font-bold hover:bg-white hover:border hover:border-black hover:text-black"
          >
            Get New password
          </button>
        </form>
        <p className="mt-4">
          Already have an account?
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
};

export default ResetPassword;