import LazyImage from "@/components/ImageLazy";
import useResizeObserver from "@/hooks/useResizeObserver";
import { AnimatePresence, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const splitIntoColumns = (data: TGifData[], columns: number) => {
  return data.reduce(
    (result: TGifData[][], item, index) => {
      const columnIndex = index % columns;
      if (!result[columnIndex]) {
        result[columnIndex] = [];
      }
      result[columnIndex].push(item);
      return result;
    },
    Array.from({ length: columns }, () => [])
  );
};

const Loader = () => (
  <div className="flex items-center gap-3">
    <div
      className="size-2 bg-green-600 animate-ping"
      style={{
        animationDelay: "0s",
      }}
    ></div>
    <div
      className="size-2 bg-amber-600 animate-ping"
      style={{
        animationDelay: "75ms",
      }}
    ></div>
    <div
      className="size-2 bg-blue-600 animate-ping"
      style={{
        animationDelay: "150ms",
      }}
    ></div>
    <div
      className="size-2 bg-violet-600 animate-ping"
      style={{
        animationDelay: "225ms",
      }}
    ></div>
  </div>
);

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
  const { ref, dimensions } = useResizeObserver();
  const columnCount = Math.min(4, Math.floor(dimensions.width / 150)) || 1;

  const columnsData = splitIntoColumns(data, columnCount);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(loadMoreRef);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <AnimatePresence>
      <div
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
        className="grid gap-1.5 md:gap-3 px-2 mt-2 mb-4"
      >
        {columnsData.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-0.5 md:gap-2">
            {column.map((gif) => (
              <div
                key={gif.images.original.url}
                className="relative group overflow-hidden"
              >
                <LazyImage
                  containerClassName="mb-1.5 md:mb-2 rounded-md"
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
        ))}
      </div>
      <div className="flex items-center justify-center my-4" ref={loadMoreRef}>
        {isFetchingNextPage && <Loader />}
      </div>
    </AnimatePresence>
  );
};

export default GifsGrid;
