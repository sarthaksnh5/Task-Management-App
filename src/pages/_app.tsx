import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar/Sidebar";
import styled from "styled-components";
import GlobalContextProvier from "~/providers/GlobalContextProvier";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <MainStyledComponent className={`font-sans ${inter.variable}`}>
        <NextTopLoader
          height={4}
          color="#27AE60"
          easing="cubic-bezier(.53,.21,0,.61)"
          showSpinner={false}
        />
        <SessionProvider session={session}>
          <GlobalContextProvier>
            <Sidebar />
            <Component {...pageProps} />
          </GlobalContextProvier>
        </SessionProvider>
      </MainStyledComponent>
    </>
  );
};

const MainStyledComponent = styled.main`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

export default api.withTRPC(MyApp);
