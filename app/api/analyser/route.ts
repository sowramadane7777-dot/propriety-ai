import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const loyer = formData.get('loyer') as string;
    const ratio = formData.get('ratio') as string;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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
          Extrais et renvoie les informations sous format JSON strict (sans markdown, sans \`\`\`json) avec exactement ces clés :
          {
            "nomCandidat": "Prénom et Nom du salarié",
            "revenuBrut": 0000,
            "conclusion": "Explication claire de la solvabilité"
          }`
        },
      ],
    });

    const textResult = response.text ? response.text.trim() : "{}";
    const cleanJson = textResult.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(cleanJson);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("ERREUR API :", error);
    return NextResponse.json({ error: error.message || "Erreur interne" }, { status: 500 });
  }
}