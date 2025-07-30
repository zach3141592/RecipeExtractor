# hands

A modern, minimalist Next.js application that extracts and formats recipes from anywhere - websites, YouTube videos, or images. Built with TypeScript, React, and AI-powered content processing, optimized for Vercel deployment.

## Features

- **🌐 Website Extraction**: Extract recipes from any recipe website (AllRecipes, Food Network, Tasty, etc.)
- **📺 YouTube Support**: Get recipes from YouTube cooking videos using transcript analysis
- **📸 Image Recognition**: Upload photos of recipes to extract text using AI-powered OCR
- **🤖 AI-Powered Formatting**: Uses OpenAI GPT to clean and format content into structured recipes
- **✨ Modern Interface**: Clean, minimalist design with smooth animations and glass morphism effects
- **📱 Responsive Design**: Perfect experience on desktop, tablet, and mobile devices
- **📄 PDF Export**: Download formatted recipes as beautiful PDF documents
- **📋 Copy to Clipboard**: One-click copying of formatted recipes
- **🚀 Vercel Ready**: Optimized for seamless deployment to Vercel
- **🔒 Secure**: Environment-based API key management
- **⚡ Fast**: Next.js with TypeScript for optimal performance

## How It Works

**hands** offers three ways to extract recipes:

### 🌐 From URLs

1. **URL Analysis**: Detects whether input is a YouTube video or recipe website
2. **Content Extraction**: Scrapes HTML content or extracts video transcripts
3. **Smart Detection**: Prioritizes structured recipe data (JSON-LD) when available

### 📸 From Images

1. **Image Upload**: Drag & drop or select recipe photos
2. **OCR Processing**: Extracts text using AI-powered image recognition
3. **Text Cleanup**: Processes extracted text for recipe formatting

### 🤖 AI Formatting

1. **Content Analysis**: OpenAI GPT analyzes extracted content
2. **Recipe Structuring**: Formats into clean ingredients, instructions, and metadata
3. **Output Options**: Copy to clipboard or download as PDF

## Quick Deploy to Vercel

Deploy **hands** to Vercel in minutes:

1. **Fork this repository** to your GitHub account
2. **Visit [Vercel](https://vercel.com)** and sign in with GitHub
3. **Click "New Project"** and select this repository
4. **Add Environment Variable**: Set `OPENAI_API_KEY` to your OpenAI API key
5. **Deploy!** Your hands app will be live globally

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

Built with ❤️ using Next.js, React, TypeScript, and OpenAI. Ready for deployment on Vercel!
