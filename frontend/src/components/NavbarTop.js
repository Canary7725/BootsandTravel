import logo from "../images/logo.jpg";
import { FaSearch } from "react-icons/fa";

const NavbarTop = () => {
  return (
    <nav class="bg-transparent w-full rounded-lg">
      <div class="flex justify-between items-center p-2 fixed top-0 z-50 mx-4 w-[95%]">
        <div className="logo">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Logo" className="rounded-full h-12 w-12" />
          </a>
        </div>

        <div class="flex items-center space-x-6 rtl:space-x-reverse text-md text-white px-2">
          <a href="#" class="text-md text-primary hover:underline">
            Login
          </a>
          <a href="#" className="text-primary hover:underline ">
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTop;
