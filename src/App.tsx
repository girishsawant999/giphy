import Grid from "@/components/Grid";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./components/Search";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 1000 * 60 * 20, // 20 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Search />
      <section className="container mx-auto py-6 px-4">
        <Grid />
      </section>
    </QueryClientProvider>
  );
}

export default App;
