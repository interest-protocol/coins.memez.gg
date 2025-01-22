import Head from 'next/head';
import { FC } from 'react';

const SEO: FC = () => (
  <Head>
    <title>MEMEZ.GG</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
    />
    <meta name="description" content="Sui IPX Coin Standard explorer" />
    <link rel="canonical" href="https://coins.memez.gg" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:site" content="@memezdotgg" />
    <meta property="twitter:title" content="MEMEZ.GG" />
    <meta
      property="twitter:description"
      content="Sui IPX Coin Standard explorer"
    />
    <meta property="twitter:image" content="/memezbanner.png" />
    <meta property="og:title" content="MEMEZ.GG" />
    <meta property="og:description" content="Sui IPX Coin Standard explorer" />
    <meta property="og:image" content="/memezbanner.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.memez.gg" />
    <link rel="icon" type="image/x-icon" href="/icon.webp" />
  </Head>
);

export default SEO;
