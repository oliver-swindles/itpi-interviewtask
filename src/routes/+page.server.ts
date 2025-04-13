import { env } from "$env/dynamic/private";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const title = form.get("jobTitle");
    const company = form.get("company");
    const description = form.get("jobDescription");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `Give a short, step by step plan for how to get a ${title} job at ${company}, you must use the job description that they provide to list skills you must learn, here is the description: ${description}`,
    });

    console.log(response.text);

    return {
      success: true,
      response: response.text,
    };
  },
};
