import Head from 'next/head';
import Navigation from '../components/Navigation';
import ImageExtractor from '../components/ImageExtractor';

export default function ExtractFromImage() {
  return (
    <>
      <Head>
        <title>Hands - Extract from Image</title>
        <meta name="description" content="Extract recipes from images using AI-powered text recognition" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <ImageExtractor />
    </>
  );
} 