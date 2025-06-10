import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      const url = new URL(window.location.href);
      url.searchParams.set("search", debouncedQuery);
      window.history.pushState({}, "", url.toString());
    }
  }, [debouncedQuery]);

  return (
    <div className="p-2 mx-2 sticky top-0 z-10 dark:bg-gray-900 rounded-sm  bg-gray-50 ">
      <div className="grid grid-cols-[1fr_auto] ring-1 ring-gray-200  items-stretch bg-white text-gray-900 placeholder:text-gray-300 rounded-md overflow-hidden text-lg">
        <input
          type="text"
          className="flex-1 px-4 py-3 border-none outline-none"
          placeholder="Search GIFs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="group aspect-square grid place-items-center [background:linear-gradient(45deg,_rgb(230,_70,_182)_0%,_rgb(255,_102,_102)_100%)] text-white  transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="group-hover:scale-110 transition-transform cursor-pointer"
          >
            <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
