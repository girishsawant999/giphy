import GifsGrid from "@/components/GifsGrid";
import Header from "@/components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import withQueryClient from "./components/withQueryClient";
import useDebounce from "./hooks/useDebounce";
import giphyService from "./services/giphy";

const perPage = 20;

function App() {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
      <Header />
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetching={isSearchingGifs}
      />
      {/* Search GIFs */}
      {debouncedQuery && (
        <>
          {searchData?.pages &&
          searchData.pages.length > 0 &&
          searchData.pages[0].data.length > 0 ? (
            <GifsGrid
              data={searchData.pages.flatMap((page) => page.data ?? [])}
              hasNextPage={hasSearchNextPage}
              fetchNextPage={fetchSearchNextPage}
              isFetchingNextPage={isSearchingNextPage}
            />
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
        <GifsGrid
          data={data.pages.flatMap((page) => page.data ?? [])}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
}

const Component = withQueryClient(App);

export default Component;
