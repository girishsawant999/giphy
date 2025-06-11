import GifsGrid from "@/components/GifsGrid";
import Header from "@/components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Search from "./components/Search";
import withQueryClient from "./components/withQueryClient";
import useDebounce from "./hooks/useDebounce";
import giphyService from "./services/giphy";

const perPage = 20;

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const initialSearchQuery = urlSearchParams.get("search") || "";

  const headerRef = useRef<HTMLElement>(null);

  const isHeaderVisible = useInView(headerRef);

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedQuery) {
      const url = new URL(window.location.href);
      url.searchParams.set("search", debouncedQuery);
      window.history.pushState({}, "", url.toString());
    }
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

  const onLogoClick = () => {
    setSearchQuery("");
  };

  return (
    <>
      <Header
        onLogoClick={onLogoClick}
        setSearchQuery={setSearchQuery}
        headerRef={headerRef}
      />
      <Search
        isHeaderVisible={isHeaderVisible}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetching={isSearchingGifs}
      />
      <div className="w-full h-auto px-4 mt-4">
        <img
          className="h-auto w-full object-contain"
          src="https://media.giphy.com/headers/2022-06-01-21-1654089664/PRIDE_BANNER_HP.gif"
          alt="All of the Pride Month GIFs!"
        />
      </div>

      {/* Search GIFs */}
      {debouncedQuery && (
        <>
          {searchData?.pages &&
          searchData.pages.length > 0 &&
          searchData.pages[0].data.length > 0 ? (
            <div>
              <h2 className="mx-4 mt-4 flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
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
            </div>
          ) : (
            isFetched &&
            !isSearchingGifs && (
              <div className="text-center text-gray-500 mt-8 italic text-shadow-rose-500 px-4">
                No GIFs found. Try searching for something else!
              </div>
            )
          )}
        </>
      )}

      {/* Trending GIFs */}
      {!debouncedQuery && data?.pages && (
        <div>
          <h2 className="mx-4 mt-4 flex items-center gap-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
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
        </div>
      )}
    </>
  );
}

const Component = withQueryClient(App);

export default Component;
