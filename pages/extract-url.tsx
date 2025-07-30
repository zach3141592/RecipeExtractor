import Head from 'next/head';
import RecipeExtractor from '../components/RecipeExtractor';

export default function ExtractFromURL() {
  return (
    <>
      <Head>
        <title>hands - Extract from URL</title>
        <meta name="description" content="Extract recipes from websites or YouTube videos using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecipeExtractor />
    </>
  );
} 