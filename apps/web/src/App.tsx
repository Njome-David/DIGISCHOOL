import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppRouter } from '@/app/router';

const qc = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000, refetchOnWindowFocus: false },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
