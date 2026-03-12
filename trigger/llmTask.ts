import { task } from "@trigger.dev/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const llmTask = task({
 id: "gemini-llm",
 run: async (payload) => {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

  const model = genAI.getGenerativeModel({
   model: payload.model
  });

  const result = await model.generateContent(payload.prompt);

  return result.response.text();
 }
});


export const cropImageTask = task({
 id: "crop-image",

 run: async ({ imageUrl, crop }) => {

  // download file

  // run ffmpeg crop

  // upload via transloadit

  return { croppedImageUrl };

 }
});

export const extractFrameTask = task({
 id: "extract-frame",

 run: async ({ videoUrl, timestamp }) => {

  // ffmpeg extraction

  return { frameUrl };

 }
});