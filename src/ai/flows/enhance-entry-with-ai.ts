// src/ai/flows/enhance-entry-with-ai.ts
'use server';
/**
 * @fileOverview Enhances a resume entry with AI suggestions to improve its effectiveness.
 *
 * - enhanceEntryWithAI - A function that takes a resume entry and provides AI-driven suggestions for improvement.
 * - EnhanceEntryWithAIInput - The input type for the enhanceEntryWithAI function.
 * - EnhanceEntryWithAIOutput - The return type for the enhanceEntryWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceEntryWithAIInputSchema = z.object({
  entryText: z.string().describe('The text of the resume entry to be enhanced.'),
  exampleEntries: z.array(z.string()).describe('Relevant examples of similar resume entries.'),
});

export type EnhanceEntryWithAIInput = z.infer<typeof EnhanceEntryWithAIInputSchema>;

const EnhanceEntryWithAIOutputSchema = z.object({
  enhancedEntry: z.string().describe('The enhanced resume entry with AI suggestions.'),
});

export type EnhanceEntryWithAIOutput = z.infer<typeof EnhanceEntryWithAIOutputSchema>;

export async function enhanceEntryWithAI(input: EnhanceEntryWithAIInput): Promise<EnhanceEntryWithAIOutput> {
  return enhanceEntryWithAIFlow(input);
}

const enhanceEntryWithAIPrompt = ai.definePrompt({
  name: 'enhanceEntryWithAIPrompt',
  input: {schema: EnhanceEntryWithAIInputSchema},
  output: {schema: EnhanceEntryWithAIOutputSchema},
  prompt: `You are an AI resume expert. Given a resume entry and some example entries, you will provide suggestions to improve the entry.

Resume Entry:
{{entryText}}

Example Entries:
{{#each exampleEntries}}
- {{this}}
{{/each}}

Enhanced Entry:`,
});

const enhanceEntryWithAIFlow = ai.defineFlow(
  {
    name: 'enhanceEntryWithAIFlow',
    inputSchema: EnhanceEntryWithAIInputSchema,
    outputSchema: EnhanceEntryWithAIOutputSchema,
  },
  async input => {
    const {output} = await enhanceEntryWithAIPrompt(input);
    return output!;
  }
);
