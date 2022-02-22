import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>
          Wordle Monkey | a Wordle helper
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="description" content="Up your Wordle game by narrowing down your letter options"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      {children}
    </>
  );
};

export default Layout;