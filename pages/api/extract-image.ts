import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import multer from 'multer';
import sharp from 'sharp';

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

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Middleware to handle file upload
const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Simulate OCR extraction from image
// In a real implementation, you would use:
// - Google Vision API
// - Tesseract.js
// - Azure Computer Vision
// - AWS Textract
async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  try {
    // Process image with Sharp for optimization
    const processedImage = await sharp(imageBuffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();

    // This is a placeholder simulation
    // In a real app, you'd send the processedImage to an OCR service
    const simulatedOcrText = `
      Classic Chocolate Chip Cookies

      Ingredients:
      - 2 1/4 cups all-purpose flour
      - 1 tsp baking soda
      - 1 tsp salt
      - 1 cup butter, softened
      - 3/4 cup granulated sugar
      - 3/4 cup packed brown sugar
      - 2 large eggs
      - 2 tsp vanilla extract
      - 2 cups chocolate chips

      Instructions:
      1. Preheat oven to 375°F (190°C).
      2. In a medium bowl, whisk together flour, baking soda, and salt.
      3. In a large bowl, cream together butter and both sugars until light and fluffy.
      4. Beat in eggs one at a time, then stir in vanilla.
      5. Gradually blend in flour mixture.
      6. Stir in chocolate chips.
      7. Drop rounded tablespoons of dough onto ungreased cookie sheets.
      8. Bake 9-11 minutes or until golden brown.
      9. Cool on baking sheet for 2 minutes; remove to wire rack.

      Makes about 5 dozen cookies.
      Prep time: 15 minutes
      Bake time: 9-11 minutes per batch
    `;

    return simulatedOcrText;
  } catch (error) {
    throw new Error(`Image processing failed: ${error}`);
  }
}

async function formatRecipeWithOpenAI(extractedText: string): Promise<string> {
  try {
    const prompt = `
    Please extract and format the following text from an image into a clean, well-structured recipe format. 
    
    Extracted Text: ${extractedText}
    
    Please format the output as follows:
    - Recipe Title
    - Description (brief)
    - Prep Time & Cook Time (if available)
    - Servings (if available)
    - Ingredients (bulleted list with quantities)
    - Instructions (numbered steps)
    - Notes or Tips (if any)
    
    If the text doesn't contain a complete recipe, please extract whatever recipe information is available and note what's missing. If there's no recipe content at all, please indicate that clearly.
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts and formats recipes from OCR text. Always provide clear, well-structured recipe formatting. If the text is unclear or incomplete, do your best to format what's available."
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
    // Handle file upload
    await runMiddleware(req, res, upload.single('image'));
    
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Extract text from image using OCR (simulated)
    const extractedText = await extractTextFromImage(file.buffer);
    
    if (!extractedText.trim()) {
      return res.status(400).json({ 
        error: 'No text could be extracted from the image. Please ensure the image contains readable text.' 
      });
    }

    // Format with OpenAI
    const formattedRecipe = await formatRecipeWithOpenAI(extractedText);
    
    return res.status(200).json({
      success: true,
      title: 'Recipe from Image',
      source: 'Image',
      formatted_recipe: formattedRecipe,
      original_url: 'Uploaded Image'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: `An error occurred while processing the image: ${error}` 
    });
  }
}

// Disable Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}; 