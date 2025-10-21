import { configure, defineFlow, generate } from "@genkit-ai/core";
import { googleGenai } from "@genkit-ai/google-genai";
import { genkit } from "@genkit-ai/next/plugin";
import * as z from "zod";

configure({
  plugins: [
    genkit(),
    googleGenai({ apiKey: process.env.GOOGLE_GENAI_API_KEY || "" }),
  ],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

const improveTextPrompt = `You are an expert resume writer and career coach.
Rewrite the following text to be more professional, concise, and impactful for a resume.
Focus on using strong action verbs and quantifying achievements where possible.
Do not add any extra formatting, introductory phrases, or explanations.
Just return the improved text, ready to be pasted directly into a resume.

Text to improve:
`;

export const improveText = defineFlow(
  {
    name: "improveText",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (text) => {
    const llmResponse = await generate({
      prompt: `${improveTextPrompt}${text}`,
      model: "gemini-1.5-flash",
      config: {
        temperature: 0.5,
      },
    });

    return llmResponse.text();
  }
);
