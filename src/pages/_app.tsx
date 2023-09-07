import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
