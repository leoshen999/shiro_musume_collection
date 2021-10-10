import { useEffect } from "react";
import type { AppProps } from "next/app";

import "../src/ensureCorrectLocationPath.js";
import "../src/index.css";
import { GlobalContextProvider } from "../src/GlobalContext";

function setupServiceWorker() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register(
    process.env.NEXT_PUBLIC_FRONTEND_BASE + "sw.js"
  );
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      setupServiceWorker();
    } else {
      document.addEventListener("DOMContentLoaded", setupServiceWorker, true);
    }
  }, []);

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}
