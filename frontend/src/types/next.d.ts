import React from 'react';

declare module 'next' {
  export type NextPage<P = {}, IP = P> = React.ComponentType<P> & {
    getInitialProps?: (context: any) => IP | Promise<IP>;
  };

  export type AppProps = {
    Component: React.ComponentType<any>;
    pageProps: any;
  };
}

declare module 'next/app' {
  export type AppProps = {
    Component: React.ComponentType<any>;
    pageProps: any;
  };
}

declare module 'next/head' {
  export default function Head(props: { children: React.ReactNode }): JSX.Element;
} 