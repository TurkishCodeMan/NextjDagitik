import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

function AppProviders({ children }) {
  const queryClient = React.useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
}

export { AppProviders };
