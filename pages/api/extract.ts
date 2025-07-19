import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import axios from 'axios';

// YouTube transcript import - using dynamic import since it's CommonJS
let YoutubeTranscript: { fetchTranscript: (videoId: string) => Promise<{ text: string }[]> };

interface RecipeResponse {
  success?: boolean;
  title?: string;
  source?: string;
  formatted_recipe?: string;
  original_url?: string;
  error?: string;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

async function getYouTubeContent(videoId: string) {
  try {
    // Dynamic import for CommonJS module
    if (!YoutubeTranscript) {
      YoutubeTranscript = (await import('youtube-transcript')).YoutubeTranscript;
    }

    // Get transcript
    const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcriptArray.map((item: { text: string }) => item.text).join(' ');
    
    // Get video title
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await axios.get(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const title = $('title').text().replace(' - YouTube', '') || 'Unknown Title';
    
    return {
      title,
      content: transcriptText,
      source: 'YouTube'
    };
  } catch (error) {
    return { error: `Failed to extract YouTube content: ${error}` };
  }
}

async function scrapeWebsiteContent(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, aside').remove();
    
    let recipeContent = '';
    
    // Look for JSON-LD structured data
    const jsonLdScript = $('script[type="application/ld+json"]').first();
    if (jsonLdScript.length) {
      try {
        const jsonData = JSON.parse(jsonLdScript.html() || '');
        const data = Array.isArray(jsonData) ? jsonData[0] : jsonData;
        if (data['@type'] === 'Recipe') {
          recipeContent = JSON.stringify(data, null, 2);
        }
      } catch {
        // Continue to other methods if JSON-LD parsing fails
      }
    }
    
    // If no structured data, try common recipe selectors
    if (!recipeContent) {
      const selectors = [
        '.recipe',
        '.recipe-content',
        '.recipe-instructions',
        '.recipe-ingredients',
        '[itemtype*="Recipe"]',
        '.entry-content',
        '.post-content',
        'main',
        'article'
      ];
      
      for (const selector of selectors) {
        const elements = $(selector);
        if (elements.length) {
          recipeContent = elements.map((_, elem) => $(elem).text()).get().join(' ');
          break;
        }
      }
    }
    
    // Fallback to body content
    if (!recipeContent) {
      recipeContent = $('body').text();
    }
    
    const title = $('title').text() || 'Recipe';
    
    return {
      title,
      content: recipeContent,
      source: 'Website'
    };
  } catch (error) {
    return { error: `Failed to scrape website: ${error}` };
  }
}

async function formatRecipeWithOpenAI(content: string, title: string, source: string) {
  try {
    const prompt = `
    Please extract and format the following ${source.toLowerCase()} content into a clean, well-structured recipe format. 
    
    Title: ${title}
    
    Content: ${content.substring(0, 4000)}
    
    Please format the output as follows:
    - Recipe Title
    - Description (brief)
    - Prep Time & Cook Time (if available)
    - Servings (if available)
    - Ingredients (bulleted list with quantities)
    - Instructions (numbered steps)
    - Notes or Tips (if any)
    
    If the content doesn't contain a complete recipe, please extract whatever recipe information is available and note what's missing.
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts and formats recipes from various content sources. Always provide clear, well-structured recipe formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3
    });
    
    return response.choices[0].message.content || 'Failed to format recipe';
  } catch (error) {
    return `Error formatting recipe with OpenAI: ${error}`;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Please provide a URL' });
    }
    
    // Check if it's a YouTube URL
    const videoId = extractYouTubeVideoId(url);
    
    let contentData;
    if (videoId) {
      // Process YouTube video
      contentData = await getYouTubeContent(videoId);
    } else {
      // Process regular website
      contentData = await scrapeWebsiteContent(url);
    }
    
    if ('error' in contentData) {
      return res.status(400).json({ error: contentData.error });
    }
    
    // Format with OpenAI
    const formattedRecipe = await formatRecipeWithOpenAI(
      contentData.content,
      contentData.title,
      contentData.source
    );
    
    return res.status(200).json({
      success: true,
      title: contentData.title,
      source: contentData.source,
      formatted_recipe: formattedRecipe,
      original_url: url
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: `An error occurred: ${error}` });
  }
} 