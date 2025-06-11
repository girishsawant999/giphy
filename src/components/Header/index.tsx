import type React from "react";

const TOP_NAVIGATION_LIST = [
  "Reactions",
  "Entertainment",
  "Sports",
  "Stickers",
  "Artists",
];

const Header: React.FC<{
  onLogoClick: () => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onLogoClick, setSearchQuery }) => {
  return (
    <header className="flex items-center justify-between p-4 ">
      <div
        role="button"
        className="flex items-center gap-2 cursor-pointer flex-1"
        onClick={onLogoClick}
      >
        <img src="/logo.svg" alt="Giphy logo" className="w-6 md:w-7 h-auto" />
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
      <nav>
        <ul className="hidden sm:flex items-center text-gray-800 dark:text-gray-200 font-semibold tracking-tight relative">
          {TOP_NAVIGATION_LIST.map((navItem, index) => (
            <li className="z-10 text-base relative px-2 text-center  border-s-8 border-gray-50  before:absolute before:transition-[bottom]  hover:before:bottom-full  before:bg-gray-50 dark:before:bg-gray-900 dark:border-gray-900  before:inset-0 before:z-[-1]  before:bottom-0.5">
              <span
                key={index + navItem}
                onClick={() => {
                  setSearchQuery(navItem);
                }}
                className="cursor-pointer "
              >
                {navItem}
              </span>
            </li>
          ))}

          <div className="absolute inset-0 [background:_linear-gradient(to_right,_#00ccff,_rgb(153,_51,_255)_31%,_#e646b6_52%,_rgb(255,_249,_170)_77%,_rgb(0,_255,_153),_rgb(0,_204,_255))_0%_50%_/_200%_50%]"></div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
