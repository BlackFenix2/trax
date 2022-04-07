import "reset-css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PlayerLayout from "src/components/PlayerLayout";
import Head from "next/head";
import { StoreProvider } from "easy-peasy";
import { store } from "src/lib/store";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },

  // components: {
  //   Button: {
  //     variants: {
  //       link: {
  //         ":focus": {
  //           outline: "none",
  //           boxShadow: "none",
  //         },
  //       },
  //     },
  //   },
  // },
});

/**
 * list of routes to omit the next.js layout form
 */
const noLayoutPages = ["/signin", "/signup"];

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {noLayoutPages.includes(appProps.router.pathname.toLowerCase()) ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
