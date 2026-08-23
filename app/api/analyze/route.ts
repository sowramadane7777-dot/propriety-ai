import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const loyer = data.get("loyer") as string;
    const ratio = data.get("ratio") as string;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Appel à l'API Gemini avec le modèle gemini-3.6-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          inlineData: {
            data: buffer.toString("base64"),
            mimeType: file.type || "application/pdf",
          },
        },
        {
          text: `Analyse cette fiche de paie pour un dossier de location au Québec. 
          Le loyer est de ${loyer}$ et le ratio exigé est de ${ratio}x.
          Extrais strictement les informations suivantes sous format texte simple :
          1. Nom de l'employeur
          2. Revenu net mensuel estimé
          3. Une conclusion claire indiquant si le candidat est ACCEPTÉ ou REFUSÉ selon le ratio de solvabilité.`
        },
      ],
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("ERREUR DETAILLEE GEMINI :", error);
    return NextResponse.json({ error: error.message || "Erreur lors de l'analyse de l'IA." }, { status: 500 });
  }
}