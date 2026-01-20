
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTrafficFrame = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: "Analyze this traffic scene. Extract visible vehicle license plate numbers and identify if any vehicle is violating safety distance. Return as JSON." },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedPlates: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            violations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  plate: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            },
            count: { type: Type.INTEGER }
          },
          required: ["detectedPlates", "count"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Frame Analysis Error:", error);
    return null;
  }
};

export const analyzeTrafficVideo = async (base64Frames: string[]) => {
  try {
    // We send a sequence of frames to gemini-3-pro-preview to understand the temporal context
    const parts = [
      { text: "Analyze these sequential frames from a traffic camera. Provide a forensic executive summary. Include: 1. A summary of traffic flow. 2. Identification of specific vehicle types (Cars, Bikes, Trucks) with counts. 3. Safety risk assessment. 4. Infrastructure improvement suggestions. Return in structured JSON." }
    ];

    base64Frames.forEach(frame => {
      parts.push({ inlineData: { mimeType: "image/jpeg", data: frame } } as any);
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            counts: {
              type: Type.OBJECT,
              properties: {
                cars: { type: Type.INTEGER },
                bikes: { type: Type.INTEGER },
                trucks: { type: Type.INTEGER }
              }
            },
            risks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Video Analysis Error:", error);
    return null;
  }
};
