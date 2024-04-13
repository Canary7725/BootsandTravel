import login_image from "../images/login-image.jpg";
import google_icon from "../images/google.svg";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Toast from "../components/Toast";
import { useAuth } from "../Context/AuthContext";

const colors = {
  text: "#f2f3d9",
  background: "#1e1e1e",
  disabled: "#D9D9D9",
};

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleError = (err) => toast.error(err);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      const { success, message, user } = data;
      if (success) {
        login(user);
        console.log(user);
        navigate("/");
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
        <h1 className="w-full mx-auto text-xl max-w-[400px] font-semibold mr-auto mb-6">
          Boots and Travels
        </h1>

        <div className="w-full flex flex-col max-w-[400px]">
          <div className="w-full flex flex-col mb-10">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">Welcome! Please enter your details</p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="w-full flex flex-col mb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full my-2 p-2 bg-primary border-b border-secondary outline-none focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full my-2 p-2 bg-primary border-b border-secondary outline-none focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
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
                className="w-full my-2 font-semibold bg-secondary  text-[#1e1e1e] rounded-md p-3 text-center flex items-center justify-center"
              >
                Login
              </button>
            </div>
          </form>
          <Toast />
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
            Don't Have an Account?
            <Link
              to="/register"
              className="font-semibold underline underline-offset-2 cursor-pointer ml-2"
            >
              Sign Up
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

export default Login;
