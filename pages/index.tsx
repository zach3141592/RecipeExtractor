import Head from 'next/head';
import RecipeExtractor from '../components/RecipeExtractor';

export default function Home() {
  return (
    <>
      <Head>
        <title>Recipe Extractor - Extract recipes from any website or YouTube video</title>
        <meta name="description" content="Extract and format recipes from any website or YouTube video using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecipeExtractor />
    </>
  );
} 