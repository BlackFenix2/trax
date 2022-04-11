import "reset-css";
import type { AppProps } from "next/app";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
  Link,
  extendTheme,
  Icon,
} from "@chakra-ui/react";
import { MdLaunch } from "react-icons/md";
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

  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
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
        <Alert status="warning" display="flex" justifyContent="center">
          <AlertIcon />
          <AlertTitle mr={2}>This is the bootcamp version of trax</AlertTitle>
          <AlertDescription>
            You can find the improved version of trax here{" "}
            <Link href="https://trax.erniefrancisiv.com">
              <b>
                trax.erniefrancisiv.com <Icon as={MdLaunch} />
              </b>
            </Link>
          </AlertDescription>
        </Alert>
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
