import { getJsonModel, getTextModel } from './client';
import { buildAnalysisPrompt, buildChatSystemPrompt } from './prompts';

function safeParseJSON(text) {
    try {
        // Stripe out accidental Markdown wrappers if the LLM slips up
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (err) {
        console.error('AI returned invalid JSON:', text);
        throw new Error('Invalid AI response format. Please try again.');
    }
}

function cleanBase64(base64Image) {
    if (!base64Image) return '';
    if (base64Image.includes(',')) {
        return base64Image.split(',')[1];
    }
    return base64Image;
}

export async function analyzeTechnique(base64Image, mimeType, profile) {
    const model = getJsonModel();
    const prompt = buildAnalysisPrompt(profile);

    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            data: cleanBase64(base64Image),
                            mimeType,
                        },
                    },
                ],
            },
        ],
    });

    const text = result.response.text();
    return safeParseJSON(text);
}

export async function askCoachFollowUp(sessionFeedback, question, profile) {
    const model = getTextModel();
    
    const systemInstruction = buildChatSystemPrompt(profile, sessionFeedback);

    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    { text: `${systemInstruction}\n\nUser Question: ${question}` }
                ]
            }
        ]
    });
    
    return result.response.text();
}