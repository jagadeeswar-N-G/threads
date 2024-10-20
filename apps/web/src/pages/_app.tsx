import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/src/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="158100995459-ogf0nvqn6r1sag1rh7eu08mvge80r5s0.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />
    </GoogleOAuthProvider>
  );
}
