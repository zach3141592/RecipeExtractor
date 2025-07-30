import Head from 'next/head';
import LandingPage from '../components/LandingPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>hands - Extract recipes from anywhere</title>
        <meta name="description" content="Extract and format recipes from websites, YouTube videos, or images using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
} 