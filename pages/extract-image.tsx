import Head from 'next/head';
import ImageExtractor from '../components/ImageExtractor';

export default function ExtractFromImage() {
  return (
    <>
      <Head>
        <title>hands - Extract from Image</title>
        <meta name="description" content="Extract recipes from images using AI-powered text recognition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImageExtractor />
    </>
  );
} 