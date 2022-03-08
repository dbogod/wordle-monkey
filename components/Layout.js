import Head from "next/head";
import { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Settings from './Settings';

const Layout = ({ children }) => {
  const [isHiContrast, setIsHiContrast] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const key = 'wordle-monkey-hi-contrast';
    const storedValue = localStorage.getItem(key);
    const isValueTrue = storedValue !== null && storedValue === 'true';
    setIsHiContrast(isValueTrue);
    document.documentElement.setAttribute('data-hi-contrast', `${isValueTrue}`);
  }, []);
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
      <Header
        setIsSettingsOpen={setIsSettingsOpen}/>
      <Settings
        isOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isHiContrast={isHiContrast}
        setIsHiContrast={setIsHiContrast}/>
      <main className={`${isSettingsOpen ? 'd-none': ''} pb-5`}>
        {children}
      </main>
      <Footer isSettingsOpen={isSettingsOpen}/>
    </>
  );
};

export default Layout;