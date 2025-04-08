import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { Product } from "@/types";
import { saveImage } from "@/hooks/ssr_hooks";

// Initialize OpenAI client
const openai = new OpenAI();

//Schema for OPEN AI structured output generation
const ProductSchema = z.object({
  title: z.string().describe("A catchy and descriptive product title"),
  description: z.string().describe("A detailed product description highlighting features and benefits"),
  price: z.number().describe("A reasonable price for the product in USD"),
  imagePrompt: z.string().describe("A detailed prompt for DALL-E to generate a high-quality product image")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Product prompt is required" },
        { status: 400 }
      );
    }

    //create OPEN AI output from schema
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { 
          role: "developer", 
          content: `
            You are an expert commercial product photographer and designer, specializing in creating clean, modern, and aesthetically pleasing images for high-end e-commerce platforms, specifically for a brand called "Sebastian's".

            Your primary task is to generate a photorealistic, high-quality product photograph based on the user's input (which will typically be the product name and potentially a brief description).

            **Default Image Generation Guidelines:**

            1.  **Subject Focus:** The product provided by the user must be the absolute hero of the image. It should be sharply in focus, well-lit, and centrally or strategically composed to draw the eye immediately.
            2.  **Style & Aesthetic:** Generate images in a modern, minimalist, sophisticated, and aesthetically pleasing style. Aim for photorealism as if shot with a professional DSLR camera.
            3.  **Background & Setting:** Default to a clean, seamless white or very light, neutral background (e.g., off-white, pale grey, subtle light texture like concrete or wood). The setting should look like a professional photo studio. Keep it uncluttered.
            4.  **Lighting:** Use bright, soft, natural-looking light or professional studio lighting. Ensure even illumination on the product, creating soft, subtle shadows that define its form without being distracting. Avoid harsh glares or overly dark areas.
            5.  **Composition:** Employ strong composition principles. Consider eye-level, slightly high-angle, or dynamic close-up shots where appropriate for the product.
            6.  **Props & Enrichment (Use Sparingly and Subtly):** If contextually relevant and enhancing, you *may* include 1-2 subtle, complementary props. These should be in the background, potentially slightly out of focus, and must *never* compete with the main product. Examples: a single botanical element, a relevant raw material (like coffee beans for a mug), a textural element (like a linen napkin corner). The goal is a touch of lifestyle or quality feel, not clutter.
            8.  **Output:** Generate a single, high-resolution product photograph suitable for an online shop listing.
            9.  **Branding** Make sure to brand the item "Sebastian's"

            When the user provides a product name/description, apply these guidelines to create the ideal product shot for "Sebastian's" online store.
          `
        },
        { 
          role: "user", 
          content: `Create product details for: ${prompt}` 
        },
      ],
      response_format: zodResponseFormat(ProductSchema, "product"),
    });

    const productDetails = completion.choices[0].message.parsed;
    if (!productDetails) {
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    // Generate product image using DALL-E 3
    const imageResponse = await openai.images.generate({ 
      model: "dall-e-3", 
      prompt: productDetails.imagePrompt,
      size: "1792x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = imageResponse.data[0].url;
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to generate product image" },
        { status: 500 }
      );
    }

    //fetch raw image and save as base64 string
    console.log("Fetching image...", imageUrl);
    const imageReq = await fetch(imageUrl);
    const imageBuffer = await imageReq.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const id = Date.now();

    const url = await saveImage(id, buffer);

    // Create the product object
    const newProduct: Product = {
      id,
      name: productDetails.title,
      price: productDetails.price,
      image: url,
      description: productDetails.description,
    };

    // In a real application, you would save this to a database
    // For now, we'll just return the created product
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
