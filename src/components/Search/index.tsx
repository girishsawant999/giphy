import { motion } from "motion/react";
import { useRef } from "react";

type TSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetching: boolean;
  isHeaderVisible: boolean;
};

const Search: React.FC<TSearchProps> = ({
  searchQuery,
  setSearchQuery,
  fetching,
  isHeaderVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="p-2 px-4 overflow-hidden sticky top-0 z-10 dark:bg-gray-900 rounded-sm  bg-gray-50 flex items-center w-full gap-5"
    >
      <>
        {!isHeaderVisible && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            transition={{
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-gray-800 dark:text-gray-200 text-lg font-semibold mb-2 hidden sm:block"
          >
            <div
              role="button"
              className="flex items-center gap-2 cursor-pointer flex-1"
              onClick={() => setSearchQuery("")}
            >
              <img
                src="/logo.svg"
                alt="Giphy logo"
                className="w-6 md:w-7 h-auto"
              />
              <img
                src="/giphy.svg"
                alt="Giphy logo"
                className="max-h-5 md:max-h-10  hidden dark:block"
              />
              <img
                src="/giphy-dark.svg"
                alt="Giphy logo"
                className="block dark:hidden max-h-9"
              />
            </div>
          </motion.div>
        )}
      </>

      <motion.div className="grid flex-1 grid-cols-[1fr_auto] ring-1 ring-gray-200  items-stretch bg-white text-gray-900 placeholder:text-gray-300 rounded-md overflow-hidden text-lg">
        <input
          type="text"
          className="flex-1 py-1.5  px-4 md:py-3 border-none outline-none"
          placeholder="Search GIFs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="group cursor-pointer aspect-square grid place-items-center [background:linear-gradient(45deg,_rgb(230,_70,_182)_0%,_rgb(255,_102,_102)_100%)] text-white  transition-colors">
          {fetching ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="animate-spin group-hover:scale-110 transition-transform"
            >
              <path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm84,84H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="group-hover:scale-110 transition-transform "
            >
              <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
            </svg>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default Search;
