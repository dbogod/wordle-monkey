import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>
          Wordle Monkey
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      {children}
      </>
  )
};

export default Layout;