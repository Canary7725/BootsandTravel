import login_image from "../images/login-image.jpg";
import google_icon from "../images/google.svg";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../components/Toast";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [phone, setPhone] = useState();
  const navigate = useNavigate();

  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => toast.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          name,
          email,
          password,
          cpassword,
          phone,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full  mx-auto flex flex-col justify-between items-center text-[#f2f3d9] bg-[#1e1e1e] p-10 ">
        <h1 className="w-full mx-auto text-xl max-w-[550px] font-semibold mr-auto mb-6">
          Boots and Travels
        </h1>

        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-10">
            <p className="text-base mb-2">Register For Free</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col mb-2">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full my-2 p-2 bg-secondary border-b border-[#f2f3d9] outline-none focus:outline-none"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full my-2 p-2 bg-secondary border-b border-[#f2f3d9] outline-none focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-row justify-between">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[45%] my-2 p-2 bg-secondary border-b border-[#f2f3d9] outline-none focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-[45%] my-2 p-2  bg-secondary border-b border-[#f2f3d9] outline-none focus:outline-none"
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Phone"
                className="w-full my-2 p-2 bg-secondary border-b border-[#f2f3d9] outline-none focus:outline-none"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember Me</p>
              </div>

              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                Forgot Password?
              </p>
            </div>

            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full my-2 font-semibold bg-[#f2f3d9] text-[#1e1e1e] border border-[#f2f3d9] rounded-md p-3 text-center flex items-center justify-center"
              >
                Register
              </button>
              <Toast />
            </div>
          </form>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-[#f2f3d9]"></div>
            <p className="absolute tex-lg px-2 text-[#f2f3d9] bg-[#1e1e1e]">
              Or
            </p>
          </div>

          <div className="w-full my-2 font-semibold bg-[#1e1e1e] text-[#f2f3d9] border border-[#f2f3d9] rounded-md p-3 text-center flex items-center justify-center">
            <img src={google_icon} className="h-6 mr-2" />
            Sign In With Google
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal">
            Already Have an Account?
            <Link
              to="/login"
              className="font-semibold underline underline-offset-2 cursor-pointer ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="relative w-1/2 h-full flex flex-col">
        <img
          src={login_image}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
