const SearchBar = () => {
  return (
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
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
