import logo from "../../images/Logo.png";
import { FaSearch } from "react-icons/fa";

const NavbarTop = () => {
  return (
    <nav class="bg-transparent w-full rounded-lg">
      <div class="flex justify-between items-center p-2 mx-4 w-[95%]">
        <div className="logo">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Logo" className="rounded-full h-16 w-16" />
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
