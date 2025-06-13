import { motion, useInView } from "motion/react";
import { useRef } from "react";

type TIntroSectionProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const TOP_NAVIGATION_LIST = [
  "Reactions",
  "Entertainment",
  "Sports",
  "Stickers",
  "Artists",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const IntroSection = ({ searchQuery, setSearchQuery }: TIntroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {});

  return (
    <>
      <div
        className="min-h-[50vh] bg-gray-950 relative flex flex-col gap-5 items-center justify-center"
        style={{
          backgroundImage: `url('https://picsum.photos/id/124/${window.innerWidth}/${window.innerHeight}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          role="button"
          className="md:absolute left-20 top-10 cursor-pointer"
          onClick={() => setSearchQuery("")}
        >
          <img
            src="/logo.svg"
            alt="Giphy logo"
            className="w-32 md:w-40 h-auto "
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center flex flex-col items-center px-6"
        >
          <h1 className="text-white text-2xl md:text-6xl font-bold text-shadow-md bg-clip-text">
            Welcome to Giphy
            <br />
          </h1>
          <p className="text-base md:text-2xl text-gray-200 text-shadow-2xs bg-clip-text">
            Your source for the best GIFs on the web
          </p>

          <div
            ref={containerRef}
            className="relative p-1.5 px-2.5 bg-white rounded-full shadow-lg border border-gray-400/40  max-w-md w-full mt-5 text-gray-800"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-4 w-full outline-none border-none pe-10 font-medium text-sm md:text-lg"
              placeholder="Search for GIFs..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="absolute right-6 top-1/2 transform -translate-y-1/2"
            >
              <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
            </svg>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hidden md:flex items-center justify-center flex-wrap mt-4 gap-2 absolute right-20 top-10 "
        >
          {TOP_NAVIGATION_LIST.map((item, index) => (
            <motion.span
              key={index}
              variants={childVariants}
              className="text-white text-sm md:text-base font-medium px-3 py-1 rounded-full bg-transparent hover:bg-white/20 hover:backdrop-blur-sm transition-colors duration-200 cursor-pointer"
              onClick={() => setSearchQuery(item)}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: !isInView ? 1 : 0, y: !isInView ? 0 : -50 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-1/2 -translate-x-1/2 top-1 p-1.5 px-2.5 bg-white rounded-full shadow-lg border border-gray-400/40  max-w-md w-full mt-5 text-gray-800 z-10"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-2 px-4 w-full outline-none border-none pe-10 font-medium "
          placeholder="Search for GIFs..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
          className="absolute right-6 top-1/2 transform -translate-y-1/2"
        >
          <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
        </svg>
      </motion.div>
    </>
  );
};

export default IntroSection;
