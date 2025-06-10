import Grid from "@/components/Grid";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <section className="container mx-auto py-6">
        <Grid />
      </section>
    </QueryClientProvider>
  );
}

export default App;
