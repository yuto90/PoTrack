import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (

  <SessionProvider session={session}>
    <Head>
      <title>PoTrack</title>
      <meta name="description" content="Full stack todo app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Toaster />
    <Component {...pageProps} />
  </SessionProvider>
);

export default api.withTRPC(MyApp);
