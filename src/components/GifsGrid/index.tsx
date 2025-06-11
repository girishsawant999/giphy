import LazyImage from "@/components/ImageLazy";

type TProps = {
  data: TGifData[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

const GifsGrid: React.FC<TProps> = ({
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
  return (
    <>
      <div className="columns-[150px] px-4 mt-2 mb-4 md:columns-[220px] gap-4">
        {data.map((gif) => (
          <div
            key={gif.images.original.url}
            className="relative group overflow-hidden"
          >
            <LazyImage
              containerClassName="mt-4 rounded-md"
              src={gif.images.original.url}
              alt={gif.title}
              height={`200px`}
              sources={[
                {
                  type: "image/webp",
                  srcset: gif.images.fixed_width.webp,
                },
              ]}
            />

            <div className="opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute bottom-0 left-0 right-0 bg-black/90 bg-opacity-50 text-white text-sm p-2 rounded-b-md">
              {gif.title || "Untitled"}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        {hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            aria-label="Load more GIFs"
            title="Load more GIFs"
            onClick={() => fetchNextPage()}
            className="px-4 py-2 text-white bg-blue-500 flex items-center gap-1.5 justify-center rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetchingNextPage && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="animate-spin group-hover:scale-110 transition-transform"
              >
                <path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm84,84H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z"></path>
              </svg>
            )}
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
};

export default GifsGrid;
