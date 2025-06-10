import LazyImage from "@/components/ImageLazy";
import giphyService from "@/services/giphy";
import { useInfiniteQuery } from "@tanstack/react-query";

const perPage = 50;

const Grid = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending-gifs"],
      queryFn: ({ pageParam = 0 }) =>
        giphyService.getTrendingGifs(perPage, pageParam),
      getNextPageParam: (lastPage) => {
        const nextOffset = lastPage.pagination.offset + perPage;
        return nextOffset < lastPage.pagination.total_count
          ? nextOffset
          : undefined;
      },
      initialPageParam: 0,
    });

  return (
    <>
      <div className="columns-[200px]">
        {data?.pages
          .flatMap((page) => page.data)
          .map((gif) => (
            <LazyImage
              containerClassName="mt-4 rounded-md"
              key={gif.id}
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
          ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        {hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            aria-label="Load more GIFs"
            title="Load more GIFs"
            onClick={() => fetchNextPage()}
            className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
};

export default Grid;
