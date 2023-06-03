import Head from "next/head";
import TplIndex from "~/components/templates/TplIndex";

export default function Index() {
  return (
    <>
      <Head>
        <title>PoTrack</title>
        <meta name="description" content="Full stack todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TplIndex />
    </>
  );
}