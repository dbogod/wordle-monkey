import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>
          Wordle Monkey
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="description" content="Up your Wordle game by narrowing down your letter options"/>
      </Head>
      {children}
      </>
  )
};

export default Layout;