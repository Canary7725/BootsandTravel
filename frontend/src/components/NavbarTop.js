import logo from "../images/logo.jpg";
import { FaSearch } from "react-icons/fa";

const NavbarTop = () => {
  return (
    <nav class="bg-transparent w-full rounded-lg">
      <div class="flex justify-between items-center p-2">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Logo" className="rounded-full h-12 w-12" />
        </a>
        <div className="search w-2/4">
          <form class="w-full mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <input
                type="search"
                id="default-search"
                class="block border-b border-white w-full px-4 py-2 ps-10 text-md bg-secondary outline-none text-[#f2f3d9] placeholder-[#f2f3d9]"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-3 bg-transparent"
              >
                <FaSearch size={15} />{" "}
                {/* Adjust the size as per your requirement */}
              </button>
            </div>
          </form>
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
