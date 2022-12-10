import Head from "next/head";
import Dashboard from "../app/pages/dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vantient</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={'Newsletter'} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={'Discover boutique brands and earn rewards by engaging with them.'} />
      </Head>
      <Dashboard />
    </>
  )
}
