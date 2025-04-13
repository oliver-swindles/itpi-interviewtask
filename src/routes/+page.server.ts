// +page.server.ts
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

    console.log("PDF File Object:", pdfFile);
    if (pdfFile instanceof File) {
      console.log("PDF File Size:", pdfFile.size);
    } else {
      console.log("PDF File is not a valid File object or is null.");
      return { success: false, error: { message: "No PDF file uploaded." } }; // Return an error to the frontend
    }

    let pdfText = "";

    if (pdfFile && pdfFile instanceof File) {
      try {
        const buffer = Buffer.from(await pdfFile.arrayBuffer());
        const parsed = await pdfParse(buffer);
        pdfText = parsed.text;
      } catch (error) {
        console.error("Error parsing PDF:", error);
        return {
          success: false,
          error: { message: "Failed to parse the PDF file." },
        }; // Return an error to the frontend
      }
    }

    console.log("Extracted PDF Text:", pdfText);

    const prompt = `
Give a short, step-by-step plan for how to get a ${title} job at ${company}.
First, give me a very short summary of how to make my CV match the job description, then use the provided job description to list skills that must be learned:

--- Job Description ---
${description}

--- Candidates CV ---
${pdfText}

Give your response as a markdown paragraph that can be rendered using mdsvex.
Keep it **very short**. Then add the following tags: <br><hr><br>
List 3 key modules that the student can take at Lancaster University to help them get this job.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });

    console.log(response.text);

    return {
      success: true,
      response: response.text,
    };
  },
};
