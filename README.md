# hands mvp

## Quick Deploy to Vercel

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

---
