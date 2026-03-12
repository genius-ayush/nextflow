import { z } from "zod";

export const llmNodeSchema = z.object({

 model: z.string(),

 systemPrompt: z.string().optional(),

    userMessage: z.string(),

    images: z.array(z.string()).optional()

    });