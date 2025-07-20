# Recipe Extractor

A powerful Next.js web application that extracts and formats recipes from any recipe website or YouTube cooking video using AI-powered content processing. Built with TypeScript, React, and optimized for Vercel deployment!

## Features

- **Universal Recipe Extraction**: Works with any recipe website (AllRecipes, Food Network, Tasty, etc.)
- **YouTube Video Support**: Extracts recipes from YouTube cooking videos using transcripts
- **AI-Powered Formatting**: Uses OpenAI GPT to clean and format extracted content into structured recipes
- **Modern React Interface**: Built with Next.js, TypeScript, and styled-jsx for optimal performance
- **Smart Content Detection**: Automatically detects structured recipe data (JSON-LD) when available
- **Copy to Clipboard**: Easy one-click copying of formatted recipes
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Vercel Ready**: Optimized for seamless deployment to Vercel
- **Environment Variables**: Secure API key management
- **Responsive Design**: Works perfectly on desktop and mobile devices

## How It Works

1. **URL Processing**: Detects whether the input is a YouTube video or a regular website
2. **Content Extraction**:
   - For websites: Scrapes HTML content using Cheerio, prioritizing structured recipe data
   - For YouTube: Extracts video transcripts and titles using youtube-transcript
3. **AI Formatting**: Sends extracted content to OpenAI GPT for intelligent recipe formatting
4. **Clean Output**: Returns a beautifully formatted recipe with ingredients, instructions, and metadata

## Quick Deploy to Vercel

The easiest way to deploy this app is to use Vercel:

1. **Fork this repository** to your GitHub account
2. **Visit [Vercel](https://vercel.com)** and sign in with GitHub
3. **Click "New Project"** and select this repository
4. **Add Environment Variable**: Set `OPENAI_API_KEY` to your OpenAI API key
5. **Deploy!** Your app will be live in minutes

## Local Development Setup

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd RecipeExtractor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   **Important**: Never commit your `.env.local` file to version control!

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Production Build

To create a production build:

```bash
npm run build
npm start
```

## Usage

### Extracting from Recipe Websites

1. Copy the URL of any recipe website (e.g., AllRecipes, Food Network, Tasty, etc.)
2. Paste the URL into the input field
3. Click "Extract Recipe"
4. Wait for the AI to process and format the recipe
5. Copy the formatted recipe using the "Copy Recipe" button

### Extracting from YouTube Videos

1. Copy the URL of a YouTube cooking video
2. Paste the URL into the input field
3. Click "Extract Recipe"
4. The app will extract the video transcript and format any recipe content found
5. Copy the formatted recipe

### Example URLs to Try

- **AllRecipes**: `https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/`
- **Food Network**: `https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524`
- **Tasty**: `https://www.tasty.co/recipe/the-best-chewy-chocolate-chip-cookies`
- **YouTube**: Any cooking video URL

## Technical Architecture

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Styling**: styled-jsx (built into Next.js)
- **Web Scraping**: Cheerio for HTML parsing
- **YouTube Processing**: youtube-transcript for transcript extraction
- **AI Processing**: OpenAI GPT-3.5-turbo for recipe formatting
- **HTTP Client**: Axios for API requests
- **Deployment**: Optimized for Vercel

### Project Structure

```
recipe-extractor/
├── components/          # React components
│   ├── RecipeExtractor.tsx
│   ├── LoadingSpinner.tsx
│   ├── RecipeResult.tsx
│   ├── ErrorMessage.tsx
│   └── ExampleUrls.tsx
├── pages/
│   ├── api/
│   │   └── extract.ts   # API route for recipe extraction
│   └── index.tsx        # Main page
├── lib/
│   └── env.ts          # Environment variable helpers
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── next.config.js      # Next.js configuration
└── vercel.json         # Vercel deployment settings
```

### API Endpoints

- `GET /`: Serves the main application interface
- `POST /api/extract`: Processes recipe extraction requests
  - Input: `{"url": "recipe_or_youtube_url"}`
  - Output: `{"success": true, "title": "...", "source": "...", "formatted_recipe": "..."}`

## Environment Variables

| Variable         | Description         | Required |
| ---------------- | ------------------- | -------- |
| `OPENAI_API_KEY` | Your OpenAI API key | Yes      |

### Setting Up Environment Variables

#### For Local Development

Create a `.env.local` file:

```env
OPENAI_API_KEY=sk-proj-your-key-here
```

#### For Vercel Deployment

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add `OPENAI_API_KEY` with your API key value

## Error Handling

The application includes comprehensive error handling for:

- Invalid URLs
- Network timeouts
- Missing transcripts (YouTube)
- Blocked websites
- OpenAI API errors
- General processing failures

## Limitations

- YouTube videos must have available transcripts
- Some websites may block automated scraping
- Recipe quality depends on the original content structure
- OpenAI API has rate limits (built into the service)

## Troubleshooting

### Common Issues

1. **"Failed to extract YouTube content"**

   - The video may not have transcripts available
   - Try a different cooking video with captions

2. **"Failed to scrape website"**

   - The website may be blocking automated requests
   - Try a different recipe website

3. **"OpenAI API Error"**

   - Check that your API key is correctly set
   - Ensure you have sufficient credits in your OpenAI account

4. **Build errors**
   - Make sure all dependencies are installed: `npm install`
   - Check Node.js version: requires 18.0 or higher

### Local Development Issues

If you encounter installation or build issues:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Security Notes

- Environment variables are used for secure API key management
- API keys are never exposed in the client-side code
- Consider implementing rate limiting for production deployments
- Always use HTTPS in production

## License

This project is for educational and personal use. Please respect website terms of service when scraping content.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Look through existing GitHub issues
3. Create a new issue with detailed information about the problem

---
