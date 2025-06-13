import GifsGrid from "@/components/GifsGrid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import IntroSection from "./components/IntroSection";
import withQueryClient from "./components/withQueryClient";
import useDebounce from "./hooks/useDebounce";
import giphyService from "./services/giphy";

const perPage = 20;

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const initialSearchQuery = urlSearchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("search", debouncedQuery);
    window.history.pushState({}, "", url.toString());
  }, [debouncedQuery]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending-gifs"],
      queryFn: ({ pageParam = 0 }) =>
        giphyService.getTrendingGifs({
          limit: perPage,
          offset: pageParam,
        }),
      getNextPageParam: (lastPage) => {
        const nextOffset = lastPage.pagination.offset + perPage;
        return nextOffset < lastPage.pagination.total_count
          ? nextOffset
          : undefined;
      },
      initialPageParam: 0,
    });

  const {
    data: searchData,
    hasNextPage: hasSearchNextPage,
    fetchNextPage: fetchSearchNextPage,
    isFetchingNextPage: isSearchingNextPage,
    isFetched,
    isFetching: isSearchingGifs,
  } = useInfiniteQuery({
    queryKey: ["search-gifs", debouncedQuery],
    queryFn: ({ pageParam = 0, queryKey }) => {
      const query = queryKey[1] as string;
      return giphyService.searchGifs({
        query,
        limit: perPage,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * perPage;
      return nextOffset < lastPage.pagination.total_count
        ? nextOffset
        : undefined;
    },
    initialPageParam: 0,
    enabled: !!debouncedQuery,
  });

  return (
    <>
      <IntroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main>
        {/* Search GIFs */}
        {debouncedQuery && (
          <>
            {searchData?.pages &&
            searchData.pages.length > 0 &&
            searchData.pages[0].data.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <h2 className="mx-4 mb-6  mt-4 flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
                  <img
                    src="/magnifying-glass.svg"
                    alt="Search"
                    className="inline-block"
                    width={24}
                    height={24}
                  />
                  Search results for
                  <span className="underline text-blue-400">
                    {debouncedQuery}
                  </span>
                </h2>
                <GifsGrid
                  data={searchData.pages.flatMap((page) => page.data ?? [])}
                  hasNextPage={hasSearchNextPage}
                  fetchNextPage={fetchSearchNextPage}
                  isFetchingNextPage={isSearchingNextPage}
                />
              </motion.div>
            ) : (
              isFetched &&
              !isSearchingGifs && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="text-center text-gray-500 mt-8 italic text-shadow-rose-500 px-4"
                >
                  No GIFs found. Try searching for something else!
                </motion.div>
              )
            )}
          </>
        )}

        {/* Trending GIFs */}
        {!debouncedQuery && data?.pages && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h2 className="mx-4 mb-6  mt-4 flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
              <img
                src="/trending.svg"
                alt="Trending"
                className="inline-block"
                width={24}
                height={24}
              />
              Trending Now
            </h2>

            <GifsGrid
              data={data.pages.flatMap((page) => page.data ?? [])}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </motion.div>
        )}
      </main>
    </>
  );
}

const Component = withQueryClient(App);

export default Component;
