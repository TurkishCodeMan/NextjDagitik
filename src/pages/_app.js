import { AppProviders } from "context";
import { Hydrate } from "react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <AppProviders>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ToastContainer />
      </Hydrate>
    </AppProviders>
    </SessionProvider>
  );
}

export default MyApp;
