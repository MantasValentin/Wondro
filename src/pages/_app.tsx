import { StoreProvider } from "@/atoms/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </RecoilRoot>
  );
}
