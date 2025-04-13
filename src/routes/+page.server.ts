import { env } from "$env/dynamic/private";
import { GoogleGenAI } from "@google/genai";
import pdfParse from "pdf-parse";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const title = form.get("jobTitle");
    const company = form.get("company");
    const description = form.get("jobDescription");
    const pdfFile = form.get("pdf") as File;

    let pdfText = "";

    if (pdfFile && pdfFile instanceof File) {
      try {
        const buffer = Buffer.from(await pdfFile.arrayBuffer());
        const parsed = await pdfParse(buffer);
        pdfText = parsed.text;
      } catch (error) {
        return {
          success: false,
          error: { message: "Failed to parse the PDF file." },
        };
      }
    }

    const prompt = `
    You're an AI assistant helping Lancaster University students get hired for the job of ${title} at ${company}.
    
    Given the job description and the candidate's CV, return a concise, practical response in **three sections**:
    
    1. **CV Alignment** Briefly explain how the student can tailor their CV to better match the job.
    2. **Application Tips** Suggest specific steps the student can take to strengthen their application.
    3. **Lancaster Support** Recommend 3 Lancaster University modules they can take to build the right skills.
    
    Use the info below:
    
    --- Job Description ---
    ${description}
    
    --- Candidate's CV ---
    ${pdfText}
    
    Output must be in **markdown** and very short, readable in under a minute.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });

    return {
      success: true,
      response: response.text,
    };
  },
};
