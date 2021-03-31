/**
 * @format
 */

import type { AppProps } from "next/app";

import "../src/index.css";
import { GlobalContextProvider } from "../src/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}
