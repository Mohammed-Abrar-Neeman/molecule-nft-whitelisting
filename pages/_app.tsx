import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { ThemeProvider } from '@magiclabs/ui';
import '@magiclabs/ui/dist/cjs/index.css';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { AppProps } from 'next/app';

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  // const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  // useEffect(() => {
  //   setUser({ loading: true });
  //   magic.user.isLoggedIn().then((isLoggedIn) => {
  //     if (isLoggedIn) {
  //       magic.user.getMetadata().then((userData) => setUser(userData));
  //     } else {
  //       Router.push('/login');
  //       setUser({ user: null });
  //     }
  //   });
  // }, []);

  return (
    <>
      <Head>
        <title>Molecule NFT Whitelisting</title>
        <meta name="description" content="Molecule NFT Whitelisting" />
        <link rel="icon" href="favicon.svg" />
      </Head>
      <Script
        src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://kit.fontawesome.com/e37922ed26.js"
        crossOrigin="anonymous"
      />
      {/* <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js" />
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/colored-shadow.js" /> */}
      {/* <link
        href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        rel="stylesheet"
      /> */}

      {/* <ThemeProvider root>
        <UserContext.Provider value={[user, setUser]}> */}
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="bg-titans_theme dark:bg-dark_portfolio_bg">
          <Component {...pageProps} />
        </div>
      </Web3ReactProvider>
      {/* </UserContext.Provider>
      </ThemeProvider> */}
    </>
  );
}

export default MyApp;
