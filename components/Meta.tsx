import React, { FC } from 'react';
import Head from 'next/head';

export interface MetaProps {
  pageTitle: string;
}

const Meta: FC<MetaProps> = ({ pageTitle }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
    </Head>
    <style jsx global>{`
      body {
        font-family: 'SegoeUI', sans-serif;
        background: #f2f2f2;
      }
    `}</style>
  </>
);

export default Meta;
