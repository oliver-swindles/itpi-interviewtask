import { env } from "$env/dynamic/private";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const jobTitle = form.get("job-title");
    const company = form.get("company");

    if (!jobTitle || !company) {
      return { success: false, message: "Missing fields" };
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `Give step by step for how to get a ${jobTitle} job at ${company}`,
    });

    const output = result.text;

    return { success: true, message: output };
  },
};
