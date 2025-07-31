import Head from 'next/head';
import Navigation from '../components/Navigation';
import RecipeExtractor from '../components/RecipeExtractor';

export default function ExtractFromURL() {
  return (
    <>
      <Head>
        <title>Hands - Extract from URL</title>
        <meta name="description" content="Extract recipes from websites or YouTube videos using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <RecipeExtractor />
    </>
  );
} 